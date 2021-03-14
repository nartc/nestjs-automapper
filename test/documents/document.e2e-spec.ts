import { API_DOCUMENTS, PATH_SEARCH_CONTENT } from '@constants/api.constants';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { DocumentModule } from '@modules/documents/document.module';
import { ERRORS } from '@constants/messages.constants';
import { SearchDto } from '@modules/documents/dtos';
import { SearchHelper } from './search.helper';
import axios from 'axios';
import moment from 'moment';
import request from 'supertest';
import { v4 as uuid } from 'uuid';

jest.mock('axios');
jest.mock('@nestjs/config');
let configService: ConfigService;

let app: INestApplication;

describe('e2e test for Document API', () => {
  let testingModule: TestingModule;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [DocumentModule],
    }).compile();

    app = testingModule.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
      })
    );

    configService = testingModule.get<ConfigService>(ConfigService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be initialized', () => {
    expect.hasAssertions();

    expect(app).not.toBeNull();
    expect(configService).toBeDefined();
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
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should get a text lists with the results of the search', async () => {
      expect.hasAssertions();

      // given
      const searchDtoMock: SearchDto = SearchHelper.getSearchDto();

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
      const response = await request(app.getHttpServer())
        .post(`${API_DOCUMENTS}${PATH_SEARCH_CONTENT}`)
        .send(searchDtoMock)
        .set('Accept', 'application/json')
        .expect(HttpStatus.OK);

      // then
      expect(response.body.success).toBeTrue();
      expect(response.body.data).not.toBeNil();
      expect(response.body.data).toStrictEqual(queryResultsDtoMock.data);
      expect(response.body.timestamp).not.toBeNil();
      expect(moment(response.body.timestamp).isValid()).toBeTrue();
      expect(response.body.message).toBeNil();
    });

    it('should return Bad Request when the input has not the correct format', async () => {
      expect.hasAssertions();

      // given
      const searchDtoMock = {
        sectionElement: '',
        docType: '',
        searchName: 'SECT_Portfolio_Turnover',
        hasUpdateTotalSearch: true,
      };

      // when
      const response = await request(app.getHttpServer())
        .post(`${API_DOCUMENTS}${PATH_SEARCH_CONTENT}`)
        .send(searchDtoMock)
        .set('Accept', 'application/json')
        .expect(HttpStatus.BAD_REQUEST);

      // then
      expect(response.body.success).toBeFalse();
      expect(response.body.data).toBeNull();
      expect(response.body.timestamp).not.toBeNil();
      expect(moment(response.body.timestamp).isValid()).toBeTrue();
      expect(response.body.message).toBe(ERRORS.BAD_FORMAT);
    });

    it('should return Internal Server Error when something fails', async () => {
      expect.hasAssertions();

      // given
      const searchDtoMock: SearchDto = SearchHelper.getSearchDto();

      jest
        .spyOn(axios, 'post')
        .mockRejectedValueOnce(new Error(ERRORS.GENERIC_EXCEPTION));

      // when
      const response = await request(app.getHttpServer())
        .post(`${API_DOCUMENTS}${PATH_SEARCH_CONTENT}`)
        .send(searchDtoMock)
        .set('Accept', 'application/json')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);

      // then
      expect(response.body.success).toBeFalse();
      expect(response.body.data).toBeNull();
      expect(response.body.timestamp).not.toBeNil();
      expect(moment(response.body.timestamp).isValid()).toBeTrue();
      expect(response.body.message).toBe(ERRORS.GENERIC_EXCEPTION);
    });
  });
});
