import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize'
import { Dialect } from 'sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/users.module'
import { AuthModule } from './auth/auth.module'
import config from './config'
import { User } from './user/models/user.model'
import { TokenModule } from './token/token.module'
import { JwtStrategy } from './strategy'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<SequelizeModuleOptions> => {
        const dbConfig = {
          dialect: 'postgres' as Dialect, // Ensure the dialect is of type Dialect
          host: configService.get('database.host'),
          port: parseInt(configService.get('database.port'), 10),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          synchronize: true,
          autoLoadModels: true,
          models: [User],
        }
        console.log('Database connection settings:', dbConfig)
        return dbConfig
      },
    }),
    UserModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
