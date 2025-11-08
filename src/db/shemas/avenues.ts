import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { quartiers } from "./quartiers";

export const avenues = pgTable("avenues", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  quartierId: varchar("quartier_id", { length: 255 }).references(
    () => quartiers.id,
    { onDelete: "cascade" }
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
