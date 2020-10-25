import { Request, Response } from 'express'
import App from '../app'
import IApplicationRoute from '../config/route.interface'
import AuthentificationController from '../controllers/auth.controller'
import UserController from '../controllers/user.controller'

const UserRoute: IApplicationRoute = {
  createRouter(router) {
    const app = App.getInstance()
    const AuthCtrl = new AuthentificationController(app)
    const UserCtrl = new UserController(app)

    return router()
      .use(AuthentificationController.validateSession)
      .get('/', (req: Request, res: Response) => {
        UserCtrl.findAll((err: any, data: any) => res.send({ users: data }))
      })
      .post('/add', (req: Request, res: Response) => {
        if (!req.body) res.send({ message: 'Empty body request', code: 400 })
        else {
          console.log({ data: req.body })
          UserCtrl.create(req.body, (newData: any) => res.send({ userCreated: newData }),
          (msg, code) => res.send({ message: msg, code: code }))
        }
      })
      .post('/login', (req: Request, res: Response) => {
        if (!req.body) res.send({ message: 'Empty body request', code: 400 })
        else AuthCtrl.login(req, res)
      })
      .get('/logout', AuthCtrl.logout)
   }
 }

export default UserRoute
