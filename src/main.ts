import * as winston from 'winston';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import compression from 'compression';
import helmet from 'helmet';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const isProd = process.env.NODE_ENV === 'prod' ? true : false;
  const Elasticsearch = require('winston-elasticsearch');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // Configure middleware
  app.use(compression());
  app.use(helmet());
  app.enableCors();

  // Add validators
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Configure logger
  if (isProd) {
    const esTransportOpts = {
      level: configService.get<string>('logger.level'),
      clientOpts: {
        node: configService.get<string>('logger.url'),
        log: configService.get<string>('logger.level'),
        index: configService.get<string>('logger.prefix'),
      },
      transformer: (logData: { level: string; message: string }) => {
        return {
          '@timestamp': new Date().getTime(),
          severity: logData.level,
          message: `[${logData.level}] LOG Message: ${logData.message}`,
          fields: {},
        };
      },
    };
    app.useLogger(
      WinstonModule.createLogger({
        level: configService.get<string>('application.log_level'),
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.simple(),
          }),
          new Elasticsearch.ElasticsearchTransport(esTransportOpts),
        ],
      })
    );
  } else {
    app.useLogger(
      WinstonModule.createLogger({
        level: configService.get<string>('application.log_level'),
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.simple(),
          }),
        ],
      })
    );
  }

  // Configure swagger
  const options = new DocumentBuilder()
    .addBasicAuth()
    .addBearerAuth()
    .setTitle('Process Service API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('application.port');
  console.log(
    `${configService.get('application.name')} is running on ${port}...`
  );
  console.log();
  await app.listen(configService.get('application.port'));
}
bootstrap();
