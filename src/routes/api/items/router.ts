import { Router } from 'express'
import { itemsController } from '../../../controllers/items'
import { validateItemBody, validateItemId } from './validations'

const itemsRouter = Router()

// Get all items
itemsRouter.get('/', async (req, res) => {
  try {
    const items = await itemsController.getAllItems()
    res.json(items)
  } catch (error) {
    console.error('Error fetching items:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create new item
itemsRouter.post('/', validateItemBody, async (req, res) => {
  try {
    const { title } = req.body

    const item = await itemsController.createItem(title)
    res.status(201).json(item)
  } catch (error) {
    console.error('Error creating item:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

itemsRouter.use('/:id', validateItemId)

// Get item by ID
itemsRouter.get('/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id)
    const item = await itemsController.getItemById(itemId)

    if (!item) {
      res.status(404).json({ error: 'Item not found' })
      return
    }

    res.json(item)
  } catch (error) {
    console.error('Error fetching item:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update item
itemsRouter.put('/:id', validateItemBody, async (req, res) => {
  try {
    const itemId = parseInt(req.params.id)
    const { title } = req.body

    const item = await itemsController.updateItem(itemId, title)

    if (!item) {
      res.status(404).json({ error: 'Item not found' })
      return
    }

    res.json(item)
  } catch (error) {
    console.error('Error updating item:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete item
itemsRouter.delete('/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id)
    const item = await itemsController.deleteItem(itemId)

    if (!item) {
      res.status(404).json({ error: 'Item not found' })
      return
    }

    res.json(item)
  } catch (error) {
    console.error('Error deleting item:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { itemsRouter }
