import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { AppErrors } from 'src/common/constants/errors'
import { CreateUserDto } from 'src/user/dto'
import { UsersService } from 'src/user/users.service'
import { UserLoginDto } from './dto'
import { AuthResponse } from './response'
import { TokenService } from 'src/token/token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registrationUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.userService.findUserByEmail(dto.email)
    if (user) throw new BadRequestException(AppErrors.UserAlreadyExist)

    return this.userService.createUser(dto)
  }

  async loginUser(dto: UserLoginDto): Promise<AuthResponse> {
    const user = await this.userService.findUserByEmail(dto.email)
    if (!user) throw new BadRequestException(AppErrors.UserNotFound)
    const isPasswordValid = await bcrypt.compare(dto.password, user.password)
    if (!isPasswordValid)
      throw new BadRequestException(AppErrors.InvalidCredentials)

    const userData = {
      name: user.name,
      email: user.email,
    }
    const token = await this.tokenService.generateToken({ userData })
    const publicUser = await this.userService.publicUser(dto.email)

    return { ...publicUser, token }
  }
}
