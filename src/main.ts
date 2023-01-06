import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);

  //El usu del useGlobalPipes permite usar el ValidationPipe de manera global en todo el codigo, haciendo que el uso del class-validator se de en todas las clases
  //la configuracion con whitelist y forbidnonwhitelisted hace que cada propiedad mandada que no sea del dto genere un error
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  await app.listen(3000);
}
main();
