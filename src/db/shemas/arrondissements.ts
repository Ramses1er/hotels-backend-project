import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const arrondissements = pgTable("arrondissements", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
