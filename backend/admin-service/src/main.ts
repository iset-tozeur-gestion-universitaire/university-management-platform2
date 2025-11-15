import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Configuration CORS pour le frontend
  // En développement, autoriser l'origine de la requête automatiquement.
  // En production, utiliser la variable d'environnement FRONTEND_URLS séparée par des virgules.
  const isProd = process.env.NODE_ENV === 'production';
  const allowedOrigins = process.env.FRONTEND_URLS
    ? process.env.FRONTEND_URLS.split(',').map((u) => u.trim())
    : undefined;

  app.enableCors({
    origin: isProd ? allowedOrigins || [] : true,
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

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`🚀 Application running on: http://localhost:${port}`);
  console.log(`📘 Swagger UI: http://localhost:${port}/api`);
}
bootstrap();
