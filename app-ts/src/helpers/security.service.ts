import * as crypto from 'crypto'

export default class SecurityService {
  public static generatePswdHash(password: string): string {
    const secret = 'hello world'
    return crypto.createHmac('sha1', secret).update(password).digest('hex')
  }

  public static validatePassword(password: string, hash: string): boolean {
    return SecurityService.generatePswdHash(password) === hash
  }
}
