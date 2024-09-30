import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  nickName: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  password: string
}

export class UpdateUserDto extends CreateUserDto {}
