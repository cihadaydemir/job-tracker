import { createInsertSchema } from "drizzle-zod"
import { applications } from "./schema"
import { z } from "zod"
import { statusValues } from "./types"

export const insertApplicationSchema = createInsertSchema(applications, {
	status: z.enum(statusValues, {
		required_error: "Status is required",
	}),
	vacancyUrl: z.string().url(),
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
})
export const updateApplicationSchema = createInsertSchema(applications, {
	id: z.number(),
	status: z.enum(statusValues, {
		required_error: "Status is required",
	}),
	vacancyUrl: z.string().url(),
}).omit({
	createdAt: true,
})
