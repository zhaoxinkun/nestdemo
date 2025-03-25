import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);


  // HMR
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());  //hot报错,安装模块-D @types/webpack-env
  }
}
bootstrap();
