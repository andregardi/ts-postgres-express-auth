// Controller for item-related business logic
import { db } from '@core/db';
import { itemsTable } from '../schema';
import { eq } from 'drizzle-orm';

export const itemsController = {
  async getAllItems() {
    return db.select().from(itemsTable).execute();
  },

  async getItemById(id: number) {
    const [item] = await db.select().from(itemsTable).where(eq(itemsTable.id, id)).limit(1);
    return item;
  },

  async createItem(title: string) {
    const [newItem] = await db.insert(itemsTable).values({ title }).returning();
    return newItem;
  },

  async updateItem(id: number, title: string) {
    const [updatedItem] = await db.update(itemsTable).set({ title }).where(eq(itemsTable.id, id)).returning();
    return updatedItem;
  },

  async deleteItem(id: number) {
    const [deletedItem] = await db.delete(itemsTable).where(eq(itemsTable.id, id)).returning();
    return deletedItem;
  }
};
