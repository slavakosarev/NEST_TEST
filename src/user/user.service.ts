/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { users } from '../moks'

@Injectable()
export class UserService {
  getUsers(): any {
    return users
  }
}
