import { Logger, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from '@modules/documents/document.module';
import Joi from 'joi';
import applicationConstants from '@constants/application.constants';
import integrationsConstants from '@constants/integrations.constants';
import loggerConstants from '@constants/logger.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [applicationConstants, loggerConstants, integrationsConstants],
      validationSchema: Joi.object({
        node_env: Joi.string().default('prod'),
        app_name: Joi.string().default('Service'),
      }),
    }),
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
