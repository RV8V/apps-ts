import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { UserService } from '../shared/user.service'
import { RegisterDto, LoginDto } from './auth.dto'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { Payload } from '../types/payload'
import { User } from 'src/utilities/user.decorator'
import { SellerGuard } from '../guards/seller.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async findAll(@User() user: any) {
    return await this.userService.findAll()
  }

  @Post('login')
  async login(@Body() userDto: LoginDto) {
    const { username, seller } = await this.userService.findByLogin(userDto)
    const payload: Payload = { username, seller }
    const token = await this.authService.signPayload(payload)
    return { username, seller, token }
  }

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    const { username, seller } = await this.userService.create(userDto)
    const payload: Payload = { username, seller }
    const token = await this.authService.signPayload(payload)
    return { username, seller, token }
  }
}
