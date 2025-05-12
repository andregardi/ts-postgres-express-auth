import { Router, Response, NextFunction, Request } from 'express'
import { authController } from '../controller/auth'
import { requireAuth } from '../middlewares/auth'

const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email must be a valid email address' })
  }

  next()
}

export const localRouter = Router()

localRouter.post('/register', validateInput, async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await authController.registerUser(email, password)
    res.status(201).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
})

localRouter.post('/login', validateInput, async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await authController.loginUser(email, password)
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
})

localRouter.get('/me', requireAuth, (req: Request, res: Response) => {
  // The user is attached to the request by Passport
  const user = req.user

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  res.status(200).json({
    user,
  })
})
