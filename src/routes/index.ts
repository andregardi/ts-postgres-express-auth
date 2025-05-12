import { Router } from 'express'
import { apiRoutes } from './api'
import { authRouter } from './auth'

export const mainRouter = Router()

mainRouter.use('/api', apiRoutes)
mainRouter.use('/auth', authRouter)
