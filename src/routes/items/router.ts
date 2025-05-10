import { Router } from 'express';
import { db } from '@core/db';
import { itemsTable } from '../../schema';
import { eq } from 'drizzle-orm';
import { validateItemBody, validateItemId } from './validations';

const itemsRouter = Router();

// Get all items
itemsRouter.get('/', async (req, res) => {
    try {
        const items = await db.select().from(itemsTable).execute();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

itemsRouter.use('/:id', validateItemId);

// Get item by ID
itemsRouter.get('/:id', async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        const [item] = await db.select().from(itemsTable).where(eq(itemsTable.id, itemId)).execute();

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new item
itemsRouter.post('/', validateItemBody, async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const [item] = await db.insert(itemsTable).values({ title }).returning().execute();

        res.status(201).json(item);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update item
itemsRouter.put('/:id', validateItemBody, async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const [item] = await db.update(itemsTable).set({ title }).where(eq(itemsTable.id, itemId)).returning().execute();

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete item
itemsRouter.delete('/:id', async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        const [item] = await db.delete(itemsTable).where(eq(itemsTable.id, itemId)).returning().execute();

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { itemsRouter };
