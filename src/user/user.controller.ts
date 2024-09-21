// eslint-disable prettier/prettier
import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('users') // prefix: /users задает путь
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all') // path: /users/all
  getUsers(): any {
    return this.userService.getUsers()
  }
}
