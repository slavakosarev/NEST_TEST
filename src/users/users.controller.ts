import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto'
import { JwtAuthGuard } from 'src/guards/jwt-guard'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('users') // prefix: /users задает путь
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() dto: UpdateUserDto, @Req() req): Promise<UpdateUserDto> {
    const user = req.user.publicUser
    // console.log(user)
    return this.userService.updateUser(dto, user.email)
  }

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() req): Promise<boolean> {
    const user = req.user.publicUser
    return this.userService.deleteUser(user.email)
  }
}
