import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { readFileSync } from 'fs';

async function bootstrap() {
  let app: INestApplication;

  if (process.env.ACTIVATE_SSL_CERTIFICATE === 'YES') {
    app = await NestFactory.create(AppModule, {
      cors: true,
      httpsOptions: {
        key: readFileSync(process.env.SSL_KEY, 'utf8'),
        cert: readFileSync(process.env.SSL_CERT, 'utf8'),
        ca: readFileSync(process.env.SSL_CA, 'utf8'),
      },
    });
    app.use(helmet());
    app.use(compression());
  } else {
    app = await NestFactory.create(AppModule, { cors: true });
  }

  app.setGlobalPrefix('/v1');

  const config = new DocumentBuilder()
    .setTitle('Documentação da API Porjeto X.')
    .setDescription('Essa API foi construída usando NestJS na versão 10.0')
    .setVersion('1.0')
    .addTag('Autenticação')
    .addTag('Configurações - Portal Gerencial')
    .addTag('Upload de arquivos')
    .addTag('Sem autenticação')
    .addTag('My Self')
    .addServer(`${process.env.HOST}:${process.env.PORT}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.ACTIVATE_SWAGGER === 'YES') {
    SwaggerModule.setup('docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
