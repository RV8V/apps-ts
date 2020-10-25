import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Model } from 'mongoose'
import { User } from 'src/types/user'
import { InjectModel } from '@nestjs/mongoose'
import { RegisterDto, LoginDto } from '../auth/auth.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private sanitizeUser(user: User): User {
    console.log({ res: user.depopulate('password') })
    return user.depopulate('password')
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({})
  }

  async create(userDto: RegisterDto): Promise<User> {
    const { username } = userDto
    try {
      const user = await this.userModel.findOne({ username })
      if (user) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
      const createdUser = new this.userModel(userDto)
      await createdUser.save()
      return this.sanitizeUser(createdUser)
    } catch(err) { console.log(err) }
  }

  async findByLogin(userDto: LoginDto) {
    const { username, password } = userDto
    try {
      const user = await this.userModel.findOne({ username })
      if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
      if (await bcrypt.compare(password, user.password)) return this.sanitizeUser(user)
      else throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    } catch(err) { console.log(err) }
  }

  async findByPayload(payload: any): Promise<User> {
    const { username } = payload
    return await this.userModel.findOne({ username })
  }
}
