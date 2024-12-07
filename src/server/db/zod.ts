import { createInsertSchema } from "drizzle-zod"
import { applications } from "./schema"
import { z } from "zod"
import { statusValues } from "./types"

export const insertApplicationSchema = createInsertSchema(applications, {
	companyName: z
		.string({
			required_error: "Company name is required",
		})
		.min(1, {
			message: "Company name must be at least 1 character long",
		})
		.trim(),
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
