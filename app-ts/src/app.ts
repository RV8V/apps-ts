import * as express from 'express' 
import { Express, Request, Response, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'

import IAppConfig from './config/app.interface'
import AppRoutes from './routes/app.route'
import AppDataProviders from './providers/appData.provider'

export default class App {
  private static app: App
  private expApp: Express

  private dataProviders: AppDataProviders

  public static getInstance(): App {
    return App.app
  }

  public constructor(private config: IAppConfig) {
    this.config = config
    this.expApp = express()
    App.app = this
  }

  public run(): void {
    this.expApp.use(session({
      resave: false,
      saveUninitialized: false,
      secret: 'secret',
      cookie: { maxAge: 3600000 }
    }))

    this.expApp.use(bodyParser.urlencoded({ extended: false }))
    this.expApp.use((req: Request, res: Response, next: NextFunction) => {
      res.contentType('application/json')
      next()
    })

    this.dataProviders = new AppDataProviders()

    const appRouter = new AppRoutes()
    appRouter.mount(this.expApp)

    this.expApp.listen(3000, (err: any) => {
      if (err) console.log(err)
      else console.log('Server started on port ' + 3000)
    })
  }

  public get providers(): AppDataProviders {
    return this.dataProviders
  }
}
