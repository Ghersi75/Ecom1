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

  await app.listen(3333);
}
bootstrap();
