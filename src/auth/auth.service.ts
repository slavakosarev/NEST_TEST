import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { AppErrors } from 'src/common/constants/errors'
import { CreateUserDto } from 'src/users/dto'
import { UsersService } from 'src/users/users.service'
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
    try {
      const user = await this.userService.findUserByEmail(dto.email)
      if (user) throw new BadRequestException(AppErrors.UserAlreadyExist)

      return this.userService.createUser(dto)
    } catch (e) {
      throw new BadRequestException(e)
    }
  }
  async loginUser(dto: UserLoginDto): Promise<AuthResponse> {
    try {
      const user = await this.userService.findUserByEmail(dto.email)

      if (!user) throw new BadRequestException(AppErrors.UserNotFound)
      const isPasswordValid = await bcrypt.compare(dto.password, user.password)

      if (!isPasswordValid)
        throw new BadRequestException(AppErrors.InvalidCredentials)
      const publicUser = await this.userService.publicUser(dto.email)
      const token = await this.tokenService.generateToken({ publicUser })

      return { user: publicUser, token }
    } catch (e) {
      throw new BadRequestException(e)
    }
  }
}
