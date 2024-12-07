import type { applications } from "./schema"

export type Application = typeof applications.$inferSelect

export const statusValues = ["pending", "accepted", "declined", "interview"] as const
export type StatusType = (typeof statusValues)[number]
