import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConflictInterceptor } from "./common/errors/interceptors/conflict.interceptor";
import { UnauthorizedInterceptor } from "./common/errors/interceptors/unauthorized.interceptor";
import { NotfoundInterceptor } from "./common/errors/interceptors/notfound.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DatabaseInterceptor } from "./common/errors/interceptors/database.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('Simple blog').setDescription('The Simple Blog API descripition').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

app.useGlobalPipes( new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}),
  );

  app.useGlobalInterceptors( new ConflictInterceptor());
  app.useGlobalInterceptors( new DatabaseInterceptor());
app.useGlobalInterceptors(new UnauthorizedInterceptor());
app.useGlobalInterceptors(new NotfoundInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
