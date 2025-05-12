import { Router, Response, Request } from 'express'
import { z } from 'zod'
import { validateBody } from '../../middlewares/body-validator'
import { itemsController } from '../../controllers/items'

const createItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
})

const updateItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
})

export const itemsRouter = Router()

// Create item
itemsRouter.post('/', validateBody(createItemSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body
    const newItem = await itemsController.createItem(title)
    res.status(201).json(newItem)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
})

// Update item
itemsRouter.put('/:id', validateBody(updateItemSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body
    const id = parseInt(req.params.id)
    const updatedItem = await itemsController.updateItem(id, title)
    if (!updatedItem) {
      res.status(404).json({ message: 'Item not found' })
      return
    }
    res.status(200).json(updatedItem)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
})

// Get all items
itemsRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await itemsController.getAllItems()
    res.status(200).json(items)
  } catch {
    res.status(500).json({ message: 'An unexpected error occurred' })
  }
})

// Get item by id
itemsRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const item = await itemsController.getItemById(id)
    if (!item) {
      res.status(404).json({ message: 'Item not found' })
      return
    }
    res.status(200).json(item)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
})

// Delete item
itemsRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const deletedItem = await itemsController.deleteItem(id)
    if (!deletedItem) {
      res.status(404).json({ message: 'Item not found' })
      return
    }
    res.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
})
