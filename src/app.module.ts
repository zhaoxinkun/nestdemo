import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// 导入orm 配置
import { connectionParams } from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [UserModule,
    // 配置使用env和使用Joi,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    // 配置orm
    TypeOrmModule.forRoot(connectionParams),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
