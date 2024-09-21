import { Injectable } from '@nestjs/common'

@Injectable() // вводимый, предназначенный
export class AppService {
  getHello(): string {
    return 'Ahuenny Nest'
  }
}
