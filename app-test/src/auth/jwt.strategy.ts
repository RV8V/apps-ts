import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthPayload } from '../models/user.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: process.env.SECRET
    })
  }

  async validate({ username }: AuthPayload) {
    const user = await this.userRepository.find({ where: { username } })
    if (!user) throw new UnauthorizedException()
    return user
  }
}
