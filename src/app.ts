import * as dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import { authRouter } from './routes/auth'
import { applyMiddlewares } from './middlewares/common'

export const coreApp = express()
const PORT = process.env.PORT

// Apply middlewares
applyMiddlewares(coreApp)

// Basic route
coreApp.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Node.js TypeScript server!' })
})

// Mount centralized routes
coreApp.use('/auth', authRouter)

// Start server
coreApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
