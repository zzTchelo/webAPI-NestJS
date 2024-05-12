import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe);

  const config = new DocumentBuilder()
    .setTitle('Swagger - WebAPI Nest')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Filmes')
    .setDescription('Para realizar requisições GET | POST | PUT | DELETE no catálogo, é preciso fornecer um token de autenticação Bearer, fornecido pela aplicação, após criar um usuário (caso ainda não o tenha), e realizando o login com o mesmo.')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(port);
}
bootstrap();
