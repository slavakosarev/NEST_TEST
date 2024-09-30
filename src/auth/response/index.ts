import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class UserResponse {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  nickName: string

  @ApiProperty()
  @IsString()
  email: string
}
export class AuthResponse {
  @ApiProperty({ type: UserResponse })
  @IsString()
  user: UserResponse

  @ApiProperty()
  @IsString()
  token: string
}
