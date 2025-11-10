import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Auth Service API')
    .setDescription('Endpoints de gestion des utilisateurs et authentification')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Swagger under /docs to avoid clash with /api prefix

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Auth Service running on: http://localhost:${port}`);
  console.log(`📘 Swagger UI: http://localhost:${port}/docs`);
}
void bootstrap();
