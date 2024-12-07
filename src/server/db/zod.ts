import { createInsertSchema } from "drizzle-zod";
import { applications } from "./schema";
import { z } from "zod";

export const insertApplicationSchema = createInsertSchema(applications, {
	status: z.enum(["pending", "accepted", "declined", "interview"], {
		required_error: "Status is required",
	}),
	vacancyUrl: z.string().url(),
}).omit({
	id: true,
	createdAt: true,
});
