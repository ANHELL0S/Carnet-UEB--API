import express from 'express'
import { setupRoutes } from '../routes/_setupRoutes.js'
import { handleError } from '../middleware/errorHandler.js'
import { setupMiddlewares } from '../middleware/setupMiddlewares.js'

const app = express()

setupMiddlewares(app)

setupRoutes(app)

app.use(handleError)

export default app
