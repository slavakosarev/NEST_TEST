import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

@Injectable() // для использования в других модулях, класс можно расширять
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // если токен истек, то он будет считаться как невалидный
      secretOrKey: configService.get('jwt_secret'),
    })
  }

  async validate(payload: any) {
    return payload
  }
}
