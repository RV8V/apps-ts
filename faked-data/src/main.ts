import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const conn = await createTypeORMConn();
  await conn.runMigrations();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
