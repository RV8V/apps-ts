import { Controller, Post, Get, UseGuards, Put, Body, ValidationPipe } from '@nestjs/common'
import { User } from 'src/auth/user.decorator'
import { AuthGuard } from '@nestjs/passport'
import { UserEntity } from 'src/entities/user.entity'
import { UpdateUserDto } from 'src/models/user.model'
import { AuthService } from 'src/auth/auth.service'

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findByUsername(@User() { username }: UserEntity) {
    return await this.authService.findCurrentUser(username)
  }

  @Put()
  async updateUser(
    @User() { username }: UserEntity,
    @Body(new ValidationPipe({ transform: true, whitelist: true })) data: { user: UpdateUserDto }
  ) {
    return await this.authService.updateUser(username, data.user)
  }
}
