import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('MaisonDuLuxeBootstrap');
  const app = await NestFactory.create(AppModule);

  // Global prefix for all API endpoints
  app.setGlobalPrefix('api/v1');

  // CORS for Flutter mobile apps and development
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global Validation Pipe with strict DTO checking
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global standard interceptor and exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Maison Du Luxe - Global Luxury Marketplace API')
    .setDescription('Modular REST API for secondary luxury assets, Cloudflare R2 media, and payment gateways')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Luxury Marketplace REST API running on: http://localhost:${port}/api/v1`);
  logger.log(`OpenAPI Swagger documentation live at: http://localhost:${port}/api/docs`);
}

bootstrap();
