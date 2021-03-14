import './mappers';

import { Logger, Module } from '@nestjs/common';

import { AutomapperModule } from 'nestjsx-automapper';
import { ConfigService } from '@nestjs/config';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [AutomapperModule.withMapper()],
  controllers: [DocumentController],
  providers: [DocumentService, Logger, ConfigService],
})
export class DocumentModule {}
