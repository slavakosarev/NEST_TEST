import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/user/dto'
import { UserLoginDto } from './dto'
import { AuthResponse } from './response'
import { JwtAuthGuard } from '../guards/jwt-guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registrationUser(dto)
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthResponse })
  @Post('login')
  login(@Body() dto: UserLoginDto): Promise<AuthResponse> {
    return this.authService.loginUser(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return 'Пливет ❤️'
  }
}
