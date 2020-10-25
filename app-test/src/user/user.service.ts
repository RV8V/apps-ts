import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async findByUsername(username: string, user?: UserEntity): Promise<UserEntity> {
    return (await this.userRepository.findOne({ where: { username }, relations: ['followers'] })).toProfile(user)
  }

  async followUser(currentUser: UserEntity, username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['followers'] })
    user.followers.push(currentUser)
    await user.save()
    return user.toProfile(currentUser)
  }

  async unfollowUser(currentUser: UserEntity, username: string) {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['followers'] })
    user.followers = user.followers.filter(follower => follower !== currentUser)
    await user.save()
    return user.toProfile(currentUser)
  }
}
