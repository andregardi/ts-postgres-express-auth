import { coreApp } from './app'
import { apiRoutes } from './routes'

coreApp.use('/api', apiRoutes)
