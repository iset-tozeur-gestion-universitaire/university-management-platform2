import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Configuration CORS pour le frontend
  app.enableCors({
    origin: ['http://localhost:3003', 'http://localhost:3004'], // URL du frontend
    credentials: true,
  });

  // ✅ Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('University Admin API')
    .setDescription('API de gestion des départements')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 👉 Swagger sera sur /api

  await app.listen(3000);
  console.log(`🚀 Application running on: http://localhost:3000`);
  console.log(`📘 Swagger UI: http://localhost:3000/api`);
}
bootstrap();
