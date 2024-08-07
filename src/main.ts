import * as dotenv from "dotenv"
dotenv.config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, validationError: { target: false }}))
  const config = new DocumentBuilder()
  .setTitle("Application")
  .setVersion("1.0")
  .build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/docs",app,document)
  await app.listen(5000);
}
bootstrap();
