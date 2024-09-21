import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize'
import config from './config'
import { Dialect } from 'sequelize'

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
          models: [],
        }
        console.log('Database connection settings:', dbConfig)
        return dbConfig
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
