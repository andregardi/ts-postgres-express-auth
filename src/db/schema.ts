import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password'), // Make password optional for OAuth users
  googleId: text('google_id').unique(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const itemsTable = pgTable('items', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
})
