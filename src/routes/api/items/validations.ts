import { NextFunction, Request, Response } from 'express'

export const validateItemId = (req: Request, res: Response, next: NextFunction) => {
  const itemId = parseInt(req.params.id)

  if (isNaN(itemId)) {
    res.status(400).json({ error: 'Invalid item ID' })
  }

  next()
}

export const validateItemBody = (req: Request, res: Response, next: NextFunction): void => {
  const { title } = req.body

  if (typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'Title must be a non-empty string' })
  }

  next()
}
