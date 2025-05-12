import { coreApp } from './app'
import { apiRoutes } from './routes/api'

coreApp.use('/api', apiRoutes)
