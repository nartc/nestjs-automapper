import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { DocumentService } from '@modules/documents/document.service';
import { ERRORS } from '@constants/messages.constants';
import { Search } from '@modules/documents/models';
import { SearchHelper } from './search.helper';
import axios from 'axios';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

let service: DocumentService;

jest.mock('axios');
jest.mock('@nestjs/config');
let configService: ConfigService;

describe('unit tests for DocumentService', () => {
  let testingModule: TestingModule;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [DocumentService, ConfigService],
    }).compile();

    service = testingModule.get<DocumentService>(DocumentService);
    configService = testingModule.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  /******************************************************/
  /******************************************************/

  describe('search document text by conditions', () => {
    beforeEach(async () => {
      jest
        .spyOn(configService, 'get')
        .mockReturnValue('http://database-gateway');
    });

    afterEach(async () => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('should get a text lists with the results of the search', async () => {
      expect.hasAssertions();

      // given
      const searchMock: Search = SearchHelper.getSearch();

      const queryResultsDtoMock = {
        success: true,
        data: [
          SearchHelper.getContentQueryResultDto(
            uuid(),
            uuid(),
            'binder-name-1',
            'text-sec-1',
            'topic-1',
            ['tag-1.1', 'tag-1.2'],
            'text-1'
          ),
          SearchHelper.getContentQueryResultDto(
            uuid(),
            uuid(),
            'binder-name-2',
            'text-sec-2',
            'topic-2',
            ['tag-2.1', 'tag-2.2'],
            'text-2'
          ),
        ],
        timestamp: moment.toString(),
      };
      jest.spyOn(axios, 'post').mockResolvedValueOnce(queryResultsDtoMock);

      // when
      const queryResults = await service.searchContentByCondition(searchMock);

      // then
      expect(queryResults).not.toBeNil();
      expect(queryResults).toHaveLength(2);
      expect(queryResults).toIncludeAllMembers(queryResultsDtoMock.data);

      // verify
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should return an error when something fails', async () => {
      expect.hasAssertions();

      // given
      const searchMock: Search = SearchHelper.getSearch();
      jest
        .spyOn(axios, 'post')
        .mockRejectedValueOnce(new Error(ERRORS.GENERIC_EXCEPTION));

      // when
      await service.searchContentByCondition(searchMock).catch((error) => {
        expect(error.message).toBe(ERRORS.GENERIC_EXCEPTION);
      });

      // verify
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });
});
