import { Router } from 'express'
import { itemsRouter } from './items/router'

export const apiRoutes = Router()

apiRoutes.use('/items', itemsRouter)
