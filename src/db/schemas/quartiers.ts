import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { arrondissements } from "./arrondissements";

export const quartiers = pgTable("quartiers", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  arrondissementId: varchar("arrondissement_id", { length: 255 }).references(
    () => arrondissements.id,
    { onDelete: "cascade" }
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});
