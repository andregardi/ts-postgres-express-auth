import { Router, Response, Request } from 'express'
import { authController } from '../../controllers/auth/auth'
import { requireAuth } from '../../middlewares/auth'
import { validateBody } from '../../middlewares/body-validator'
import { z } from 'zod'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

export const localRouter = Router()

localRouter.post('/register', validateBody(authSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    const result = await authController.registerUser(email, password)
    res.status(201).json(result)
    return
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
      return
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
      return
    }
  }
})

localRouter.post('/login', validateBody(authSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    const result = await authController.loginUser(email, password)
    res.status(200).json(result)
    return
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
      return
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
      return
    }
  }
})

localRouter.get('/me', requireAuth, async (req: Request, res: Response): Promise<void> => {
  // The user is attached to the request by Passport
  const user = req.user

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  res.status(200).json({
    user,
  })
})
