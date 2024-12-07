import { eq, and } from "drizzle-orm"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { applications } from "~/server/db/schema"
import { insertApplicationSchema, updateApplicationSchema } from "~/server/db/zod"

export const applicationRouter = createTRPCRouter({
	get: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(applications).where(eq(applications.userId, ctx.userId))
	}),
	create: protectedProcedure.input(insertApplicationSchema).mutation(async ({ ctx, input }) => {
		return await ctx.db
			.insert(applications)
			.values({
				...input,
				userId: ctx.userId,
			})
			.returning()
	}),
	deleteById: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
		await ctx.db
			.delete(applications)
			.where(and(eq(applications.id, input), eq(applications.userId, ctx.userId)))
			.run()
	}),
	updateById: protectedProcedure
		.input(z.object({ applicationId: z.number(), updatedApplication: updateApplicationSchema }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.update(applications)
				.set(input.updatedApplication)
				.where(and(eq(applications.id, input.applicationId), eq(applications.userId, ctx.userId)))
				.run()
		}),
})
