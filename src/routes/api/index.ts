import { Router } from 'express'
import { itemsRouter } from './items'

export const apiRoutes = Router()

apiRoutes.use('/items', itemsRouter)
