import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";
import { ConflictInterceptor } from "./common/errors/interceptors/conflict.interceptor";
import { DatabaseInterceptor } from "./common/errors/interceptors/database.interceptor-DESKTOP-ULUN81V";
import { UnauthorizedInterceptor } from "./common/errors/interceptors/unauthorized.interceptor";
import { NotfoundInterceptor } from "./common/errors/interceptors/notfound.interceptor";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.useGlobalPipes( new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}),
  );

  app.useGlobalInterceptors( new ConflictInterceptor());
  app.useGlobalInterceptors( new DatabaseInterceptor());
app.useGlobalInterceptors(new DatabaseInterceptor());
app.useGlobalInterceptors(new UnauthorizedInterceptor());
app.useGlobalInterceptors(new NotfoundInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
