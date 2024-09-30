import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize'
import { Dialect } from 'sequelize'
import config from './config'
import { JwtStrategy } from './strategy'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { TokenModule } from './token/token.module'
import { WatchlistModule } from './watchlist/watchlist.module'
import { User } from './users/models/user.model'
import { Watchlist } from './watchlist/models/watchlist.model'

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
          models: [User, Watchlist],
        }
        console.log('Database connection settings:', dbConfig)
        return dbConfig
      },
    }),
    UserModule,
    AuthModule,
    TokenModule,
    WatchlistModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
