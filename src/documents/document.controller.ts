import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/types";
import { API_DOCUMENTS, PATH_SEARCH_CONTENT } from '@constants/api.constants';
import { ERRORS } from '@constants/messages.constants';
import { BaseController } from '@decorators/base-controller.decorator';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Logger,
  LoggerService,
  Post
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { ContentQueryResultDto, SearchDto } from './dtos';
import { ContentQueryResult, Search } from './models';

@Controller(API_DOCUMENTS)
@BaseController()
export class DocumentController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly documentService: DocumentService
  ) {}

  @Post(PATH_SEARCH_CONTENT)
  @HttpCode(HttpStatus.OK)
  async searchContentByCondition(
    @Body() searchDto: SearchDto
  ): Promise<ContentQueryResultDto[]> {
    try {
      const search: Search = this.mapper.map(searchDto, Search, SearchDto);
      //const search: Search = SearchMapper.fromDtoToModel(searchDto);
      const queryResults = await this.documentService.searchContentByCondition(
        search
      );
      return this.mapper.mapArray(
        queryResults,
        ContentQueryResultDto,
        ContentQueryResult
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ERRORS.GENERIC_EXCEPTION);
    }
  }
}
