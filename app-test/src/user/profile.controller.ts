import { Controller, Get, Param, NotFoundException, Post, Delete, UseGuards, HttpCode } from '@nestjs/common'
import { UserService } from './user.service'
import { UserEntity } from 'src/entities/user.entity'
import { User } from 'src/auth/user.decorator'
import { AuthGuard } from '@nestjs/passport'
import { OptinalAuthGuard } from 'src/auth/optional-auth.gaurd'

@Controller('profiles')
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  @UseGuards(new OptinalAuthGuard())
  async findProfile(@Param('username') username: string, @User() user: UserEntity): Promise<{ profile: UserEntity }> {
    const profile = await this.userService.findByUsername(username, user)
    if (!profile) throw new NotFoundException('No such user profile')
    return { profile }
  }

  @Post('/:username/follow')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  async followUser(@User() currentUser: UserEntity, @Param('username') username: string) {
    const profile = await this.userService.followUser(currentUser, username)
    return { profile }
  }

  @Delete('/:username/unfollow')
  @UseGuards(AuthGuard())
  async unfollowUser(@User() currentUser: UserEntity, @Param('username') username: string) {
    const profile = await this.userService.unfollowUser(currentUser, username)
    return { profile }
  }
}
