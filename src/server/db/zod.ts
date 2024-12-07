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
	vacancyTitle: z.string().optional(),
	vacancyUrl: z.string().trim().url().optional(),
})
	.omit({
		id: true,
		userId: true,
		createdAt: true,
		updatedAt: true,
	})
	.refine(
		(data) => {
			if (data.vacancyUrl) {
				return !!data.vacancyTitle
			}
			return true
		},
		{
			message: "Vacancy title is required when URL is provided",
			path: ["vacancyTitle"],
		},
	)

export const updateApplicationSchema = createInsertSchema(applications, {
	id: z.number(),
	status: z.enum(statusValues, {
		required_error: "Status is required",
	}),
	vacancyUrl: z.string().url(),
}).omit({
	userId: true,
	createdAt: true,
})
