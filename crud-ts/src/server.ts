import express from 'express'
import * as bodyParser from 'body-parser'

import { notFoundError, errorHandler } from './middlewares/error.middleware'
import { router as groceriesRoutes } from './controllers/groceries.routes'

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => res.json({ hello: 'world' }))

app.use('/groceries', groceriesRoutes)

app.use(notFoundError)
app.use(errorHandler)

export const server = async () => {
  app.listen(process.env.PORT, () => console.log('server started'))
}
