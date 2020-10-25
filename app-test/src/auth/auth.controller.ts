import { Controller, Post, Get, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegistrationDto, LoginDto } from '../models/user.model'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) credentials: { user: RegistrationDto }) {
    return await this.authService.register(credentials.user)
  }

  @Post('login')
  async login(@Body(ValidationPipe) credentials: { user: LoginDto }) {
    return await this.authService.login(credentials.user)
  }
}
