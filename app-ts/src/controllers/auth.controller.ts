import { Request, Response, NextFunction } from 'express'
import UserDataProvider from '../providers/user.provider'
import SecurityService from '../helpers/security.service'
import App from '../app'

export default class AuthController {
  private userProviderInstance: UserDataProvider

  private constructor(private app: App) {
    this.userProviderInstance = this.app.providers.user
  }

  public login(req: Request, res: Response) {
    const { password, email } = req.body
    this.userProviderInstance.findOne(email, (err, user) => {
      if (err) return res.sendStatus(500)
      const flag = SecurityService.validatePassword(password, user.password)
      if (!user || !flag) return res.send({ message: 'Incorrect password', code: 400 })
      else {
        user.lastVisit = Date.now().toString()
        this.userProviderInstance.update({ _id: user._id }, user, () =>
          console.log(`User ${user.email} lastVisit: ${user.lastVisit}`)
        )
        req.session.userId = user._id
        res.send({ message: 'Welcome' })
      }
    })
  }

  public logout(req: Request, res: Response) {
    const session = req.session
    if (!session) return res.sendStatus(400)
    else session.destroy(() => res.send({ message: 'Goodbye, see you soon' }))
  }

  static validateSession(req: Request, res: Response, next: NextFunction) {
    const session = req.session
    if (~['/login', '/add'].indexOf(req.path)) {
      if (!session.userId) next()
      else res.sendStatus(406)
    } else {
      if (session.userId) next()
      else res.sendStatus(401)
    }
  }
}
