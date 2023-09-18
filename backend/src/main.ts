import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    // This removes the fields/elements that aren't defined
    // For example, if a description is passed on login, that description wont make it to the controller/service
    whitelist: true
  }))

  app.enableCors({
    origin: 'http://localhost:3000', // Allow only this origin. Wildcards '*' can't be used in conjunction with credentials
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
  });

  await app.listen(3333);
}
bootstrap();
