import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class AuthResponse {
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

  @ApiProperty()
  @IsString()
  token: string
}
