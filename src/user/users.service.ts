import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcrypt'
// import { users } from '../moks'
import { User } from './models/user.model'
import { CreateUserDto } from './dto'
import { AppErrors } from 'src/common/errors'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userReository: typeof User) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userReository.findOne({ where: { email } })
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.findUserByEmail(dto.email)
    if (user) throw new BadRequestException(AppErrors.UserAlreadyExist)
    dto.password = await this.hashPassword(dto.password)
    await this.userReository.create({
      name: dto.name,
      nickName: dto.nickName,
      email: dto.email,
      password: dto.password,
    })
    return dto
  }
}
