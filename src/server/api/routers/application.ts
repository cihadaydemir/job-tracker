import { eq } from "drizzle-orm"
import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { applications } from "~/server/db/schema"
import { insertApplicationSchema } from "~/server/db/zod"

export const applicationRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(applications)
	}),
	create: publicProcedure.input(insertApplicationSchema).mutation(async ({ ctx, input }) => {
		await ctx.db.insert(applications).values({
			...input,
		})
	}),
	deleteById: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
		await ctx.db.delete(applications).where(eq(applications.id, input)).run()
	}),
})
