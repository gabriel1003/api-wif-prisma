import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),

  );

  app.useGlobalInterceptors( new ConflictInterceptor());
  app.useGlobalInterceptors( new DatabaseInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
