import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as net from 'node:net';

async function findAvailablePort(
  preferred: number,
  maxAttempts = 10,
): Promise<number> {
  for (let offset = 0; offset < maxAttempts; offset++) {
    const port = preferred + offset;
    const isFree = await new Promise<boolean>((resolve) => {
      const srv = net.createServer();
      srv.once('error', (e) => {
        const err = e as { code?: string };
        if (err.code === 'EADDRINUSE') {
          resolve(false);
        } else {
          resolve(false);
        }
      });
      srv.once('listening', () => {
        srv.close(() => resolve(true));
      });
      srv.listen(port, '0.0.0.0');
    });
    if (isFree) return port;
  }
  throw new Error(`Aucun port libre trouvé à partir de ${preferred}`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('University Admin API')
    .setDescription('API de gestion des départements')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 👉 Swagger sera sur /api

  const desired = Number(process.env.PORT) || 3000;
  const port = await findAvailablePort(desired);
  if (port !== desired) {
    console.warn(
      `⚠️ Port ${desired} occupé. Utilisation du port libre ${port}.`,
    );
  }
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application running on: http://localhost:${port}`);
  console.log(`📘 Swagger UI: http://localhost:${port}/api`);
}
void bootstrap();
