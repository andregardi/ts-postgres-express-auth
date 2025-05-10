import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const itemsTable = pgTable("items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});
