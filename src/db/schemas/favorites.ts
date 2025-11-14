import { pgTable } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { hotels } from "./hotels";
import { primaryKey } from "drizzle-orm/pg-core";

export const favorites = pgTable(
  "favorites",
  {
    id: varchar("id", { length: 255 }).notNull(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    hotelId: varchar("hotel_id", { length: 255 })
      .notNull()
      .references(() => hotels.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [primaryKey({ columns: [table.id] })]
);
