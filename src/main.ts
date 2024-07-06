import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
require('dotenv').config();
const PORT = process.env.PORT || 4000
async function bootstrap() {
  dotenv.config(); // Load .env variables
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true })); 
  app.setGlobalPrefix('api/v1')
  app.enableCors();
  console.log("App is running on PORT",PORT)
  await app.listen(PORT);
}
bootstrap();
