import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator'

export class LoginDto {
  @IsEmail()
  @IsString()
  @MinLength(4)
  readonly email: string

  @IsString()
  @MinLength(4)
  readonly password: string
}

export class RegistrationDto extends LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string
  
  @IsOptional()
  image: string

  @IsOptional()
  bio: string
}

export interface AuthPayload {
  readonly username: string
}
