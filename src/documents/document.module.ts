import { classes } from "@automapper/classes";
import { CamelCaseNamingConvention } from "@automapper/core";
import { AutomapperModule } from "@automapper/nestjs";
import { SearchMapper } from "@modules/documents/mappers";

import { Logger, Module } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";
import { DocumentController } from "./document.controller";
import { DocumentService } from "./document.service";
import "./mappers";

@Module({
  imports: [AutomapperModule.forRoot({
    singular: true,
    options: [
      { name: "classes", pluginInitializer: classes, namingConventions: new CamelCaseNamingConvention() }
    ]
  })],
  controllers: [DocumentController],
  providers: [SearchMapper, DocumentService, Logger, ConfigService]
})
export class DocumentModule {
}
