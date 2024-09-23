import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto'

@Controller('users') // prefix: /users задает путь
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create-user') // path: /users/create-user
  createUser(@Body() dto: CreateUserDto) {
    console.log(dto)
    return this.userService.createUser(dto)
  }
}
