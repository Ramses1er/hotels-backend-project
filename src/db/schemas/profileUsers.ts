import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { quartiers } from "./quartiers";

export const profileUsers = pgTable("profile_users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => users.id, {
    onDelete: "cascade",
  }),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  quartierId: varchar("quartier_id", { length: 255 }).references(
    () => quartiers.id,
    {
      onDelete: "cascade",
    }
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
