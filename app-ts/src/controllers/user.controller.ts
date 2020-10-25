import App from '../app'
import User from '../entities/user.entity'
import UserDataProvider from '../providers/user.provider'
import SecurityService from '../helpers/security.service'

export default class UserController {
  private userProviderInstance: UserDataProvider

  private constructor(private app: App) {
    this.userProviderInstance = this.app.providers.user
  }

  public findAll(onLoad: (err: string, data: User[]) => void) {
    this.userProviderInstance.select({}, onLoad)
  }

  public findByEmail(email: string, onLoad: (data: User | null) => void, onError: (msg: string, code: number) => void) {
    this.userProviderInstance.findOne(email, (err, data) => {
      if (err) onError(err.message, 500)
      else {
        const result = data !== undefined ? data : null
        onLoad(result)
      }
    })
  }

  public create(data: any, onCreate: any, onError: (msg: string, code: number) => void) {
    const emailPattern = /^[a-z0-9_-]/
    if (!emailPattern.test(data.email) || !data.password.length) onError('Incorrect password or email', 400)
    else {
      this.findByEmail(data.email, result => {
        if (!result) {
          const user = new User()
          user.name = data.name
          user.email = data.email
          user.password = SecurityService.generatePswdHash(data.password)
          this.userProviderInstance.create(user, (err, newData) => {
            if (err) onError(err.message, 500)
            else onCreate(newData)
          })
        }
        else onError('User already exists', 400)
      }, onError)
    }
  }

  public removeById(id: string, onRemove: any) {
    this.userProviderInstance.delete({ _id: id }, onRemove)
  }

  public updateById(id: string, newData: User, onUpdata: any) {
    this.userProviderInstance.update(id, newData, onUpdata)
  }
}
