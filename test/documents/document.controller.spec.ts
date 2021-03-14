import {
  AutoMapper,
  AutomapperModule,
  getMapperToken,
} from 'nestjsx-automapper';
import {
  ContentQueryResult,
  Rank,
  Search,
  SearchCondition,
  SearchConditionElement,
  SearchConditions,
} from '@modules/documents/models';
import {
  ContentQueryResultDto,
  RankDto,
  SearchConditionDto,
  SearchConditionElementDto,
  SearchConditionsDto,
  SearchDto,
} from '@modules/documents/dtos';
import { HttpStatus, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { DocumentController } from '@modules/documents/document.controller';
import { DocumentService } from '@modules/documents/document.service';
import { ERRORS } from '@constants/messages.constants';
import { SearchHelper } from './search.helper';
import { v4 as uuid } from 'uuid';

let controller: DocumentController;

jest.mock('@modules/documents/document.service');
let documentService: DocumentService;

let mapper: AutoMapper;

describe('unit tests for the DocumentController', () => {
  let testingModule: TestingModule;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AutomapperModule.withMapper()],
      controllers: [DocumentController],
      providers: [DocumentService, Logger],
    }).compile();

    controller = testingModule.get<DocumentController>(DocumentController);
    documentService = testingModule.get<DocumentService>(DocumentService);
    mapper = testingModule.get<AutoMapper>(getMapperToken());
    mapper.createMap(ContentQueryResult, ContentQueryResultDto);
    mapper.createMap(Rank, RankDto);
    mapper.createMap(SearchDto, Search);
    mapper.createMap(SearchConditionsDto, SearchConditions);
    mapper.createMap(SearchConditionDto, SearchCondition);
    mapper.createMap(SearchConditionElementDto, SearchConditionElement);
  });

  it('should be defined', () => {
    expect.hasAssertions();
    expect(controller).toBeDefined();
    expect(documentService).toBeDefined();
  });

  /******************************************************/
  /******************************************************/

  describe('search document text by conditions', () => {
    afterEach(async () => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('should get a text lists with the results of the search', async () => {
      expect.hasAssertions();

      // given
      const searchDtoMock: SearchDto = SearchHelper.getSearchDto();
      const queryResultsMock: ContentQueryResult[] = [
        SearchHelper.getContentQueryResult(
          uuid(),
          uuid(),
          'binder-name-1',
          'text-sec-1',
          'topic-1',
          ['tag-1.1', 'tag-1.2'],
          'text-1'
        ),
        SearchHelper.getContentQueryResult(
          uuid(),
          uuid(),
          'binder-name-2',
          'text-sec-2',
          'topic-2',
          ['tag-2.1', 'tag-2.2'],
          'text-2'
        ),
      ];
      jest
        .spyOn(documentService, 'searchContentByCondition')
        .mockResolvedValueOnce(queryResultsMock);

      const resultsDtoMock = mapper.mapArray(
        queryResultsMock,
        ContentQueryResultDto,
        ContentQueryResult
      );

      // when
      const results = await controller.searchContentByCondition(searchDtoMock);

      // then
      expect(results).not.toBeNil();
      expect(results).toHaveLength(2);
      expect(results).toIncludeAllMembers(resultsDtoMock);

      // verify
      expect(documentService.searchContentByCondition).toHaveBeenCalledTimes(1);
    });

    it('should return an error when something fails', async () => {
      expect.hasAssertions();

      // given
      const searchDtoMock: SearchDto = SearchHelper.getSearchDto();
      jest
        .spyOn(documentService, 'searchContentByCondition')
        .mockRejectedValueOnce(new Error(ERRORS.GENERIC_EXCEPTION));

      // when
      await controller
        .searchContentByCondition(searchDtoMock)
        .catch((error) => {
          expect(error.message).toBe(ERRORS.GENERIC_EXCEPTION);
          expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        });

      // verify
      expect(documentService.searchContentByCondition).toHaveBeenCalledTimes(1);
    });
  });
});
