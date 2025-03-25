// 导入所需的实体
import { UserEntity } from './src/user/user.entity';
import { ProfileEntity } from './src/user/profile.entity';
import { LogEntity } from './src/log/log.entity';
import { RolesEntity } from './src/roles/roles.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

// 配置env
import * as dotenv from 'dotenv';

dotenv.config();

import { ConfigEnum } from './src/enum/configEnum';
import * as fs from 'node:fs';

// 读取env函数
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}

function buildConnectionOptions() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
  console.log('defaultConfig', defaultConfig);
  console.log('envConfig', envConfig);
  const config = { ...defaultConfig, ...envConfig };
  console.log('config', config);
  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    autoLoadEntities: true, // 自动加载 entity
    entities: [UserEntity, ProfileEntity, LogEntity, RolesEntity],
    synchronize: config[ConfigEnum.DB_SYNCHRONIZE],
    logging: ['error'],
  } as TypeOrmModuleOptions;

}

export const connectionParams = buildConnectionOptions();

const AppDataSource = new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);

export default AppDataSource;

// 初始化测试链接
AppDataSource.initialize().then(async () => {
  console.log('Data Source has been initialized!');
  const res = await AppDataSource.manager.find(UserEntity);
  console.log('Here you can setup and run express / fastify / any other framework.', res);
}).catch((err) => {
  console.error('Error during Data Source initialization', err);
});