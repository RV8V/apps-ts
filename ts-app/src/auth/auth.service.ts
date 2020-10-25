import { Injectable } from '@nestjs/common'
import { UserService } from '../shared/user.service'
import { Payload } from '../types/payload'
import { User } from 'src/types/user'
import { sign } from 'jsonwebtoken'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRESIN })
  }

  async validateUser(payload: Payload): Promise<User> {
    return await this.userService.findByPayload(payload)
  }
}
