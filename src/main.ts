import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
require('dotenv').config();
async function bootstrap() {
  dotenv.config(); // Load .env variables
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); 
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
