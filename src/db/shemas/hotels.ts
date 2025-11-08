import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { avenues } from "./avenues";

export const hotels = pgTable("hotels", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  avenueId: varchar("avenue_id", { length: 255 }).references(() => avenues.id, {
    onDelete: "cascade",
  }),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
