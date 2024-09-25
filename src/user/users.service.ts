import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcrypt'
// import { users } from '../moks'
import { User } from './models/user.model'
import { CreateUserDto, UpdateUserDto } from './dto'

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
    dto.password = await this.hashPassword(dto.password)
    await this.userReository.create({
      name: dto.name,
      nickName: dto.nickName,
      email: dto.email,
      password: dto.password,
    })
    return dto
  }

  async publicUser(email: string): Promise<User> {
    return this.userReository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    })
  }

  async updateUser(dto: UpdateUserDto, email: string): Promise<UpdateUserDto> {
    await this.userReository.update(dto, { where: { email } })
    return dto
  }

  async deleteUser(email: string) {
    await this.userReository.destroy({ where: { email } })
    return true
  }
}
