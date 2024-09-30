import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcrypt'
// import { users } from '../moks'
import { User } from './models/user.model'
import { Watchlist } from 'src/watchlist/models/watchlist.model'
import { CreateUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userReository: typeof User) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10)
    } catch (e) {
      throw new Error(e)
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userReository.findOne({
        where: { email },
        include: { model: Watchlist, required: false },
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    try {
      dto.password = await this.hashPassword(dto.password)
      await this.userReository.create({
        name: dto.name,
        nickName: dto.nickName,
        email: dto.email,
        password: dto.password,
      })
      return dto
    } catch (e) {
      throw new Error(e)
    }
  }

  async publicUser(email: string): Promise<User> {
    try {
      return this.userReository.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: Watchlist,
          required: false,
        },
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateUser(dto: UpdateUserDto, email: string): Promise<UpdateUserDto> {
    try {
      await this.userReository.update(dto, { where: { email } })
      return dto
    } catch (e) {
      throw new Error(e)
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userReository.destroy({ where: { email } })
      return true
    } catch (e) {
      throw new Error(e)
    }
  }
}
