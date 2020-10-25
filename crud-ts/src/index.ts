import 'dotenv/config'
import { server } from './server'
import { dbConnect } from './database.connection'

(async () => {
  await dbConnect()
  await server()
})()
