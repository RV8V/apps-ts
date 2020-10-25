import { Injectable, InternalServerErrorException, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RegistrationDto, LoginDto } from '../models/user.model'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { AuthPayload } from '../models/user.model'
import { UpdateUserDto } from 'src/models/user.model'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async register(credentials: RegistrationDto) {
    try {
      const user = await this.userRepository.create(credentials)
      await user.save()
      const payload: AuthPayload = { username: user.username }
      const token = this.jwtService.sign(payload)
      return { user: { ...user.toJson(), token } }
    } catch(err) {
      if (err.code === '23505') throw new ConflictException('Username has been taken')
      throw new InternalServerErrorException()
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOne({ where: { email } })
      const payload: AuthPayload = { username: user.username }
      const token = this.jwtService.sign(payload)
      if (user && await user.comparePassword(password)) return { user: { ...user.toJson(), token } }
      throw new UnauthorizedException('Invalid credentials')
    } catch(err) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  async findCurrentUser(username: string) {
    const user = await this.userRepository.findOne({ where: { username } })
    const payload: AuthPayload = { username }
    const token = this.jwtService.sign(payload)
    return { user: { ...user.toJson(), token } }
  }

  async updateUser(username: string, data: UpdateUserDto) {
    await this.userRepository.update({ username }, data)
    const user = await this.userRepository.findOne({ where: { username } })
    const payload: AuthPayload = { username }
    const token = this.jwtService.sign(payload)
    return { user: { ...user.toJson(), token } }
  }
}
