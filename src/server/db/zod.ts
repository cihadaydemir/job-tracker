import { createInsertSchema } from "drizzle-zod"
import { applications } from "./schema"
import { z } from "zod"
import { statusValues } from "./types"

const customizedApplicaitonSchemaProps = {
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
	vacancyTitle: z
		.union([z.string().min(3, "Vacancy title must be at least 3 characters long").optional(), z.literal("")])
		.default(""),
	vacancyUrl: z.union([z.string().url().optional(), z.literal("")]).default(""),
}

export const insertApplicationSchema = createInsertSchema(applications, customizedApplicaitonSchemaProps)
	.omit({
		id: true,
		userId: true,
		createdAt: true,
		updatedAt: true,
		deletedAt: true,
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
	...customizedApplicaitonSchemaProps,
	status: z.enum(statusValues, {
		required_error: "Status is required",
	}),
}).omit({
	userId: true,
	createdAt: true,
})
