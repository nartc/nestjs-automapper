import { ContentQueryResultDto, SearchDto } from '@modules/documents/dtos';

import { ContentQueryResult } from '@modules/documents/models/search/content-query-result.model';
import { Search } from '@modules/documents/models';
import { SearchConditionType } from '@shared/enums/search-condition-type.enum';

export class SearchHelper {
  static getSearchDto(): SearchDto {
    return {
      conditions: {
        includeTexts: {
          conditionType: SearchConditionType.OR,
          texts: [
            {
              name: 'Portfolio Turnover:',
            },
          ],
        },
        excludeTexts: {
          conditionType: SearchConditionType.OR,
          texts: [],
        },
        includeTags: {
          conditionType: SearchConditionType.OR,
          texts: [],
        },
        excludeTags: {
          conditionType: SearchConditionType.OR,
          texts: [],
        },
      },
      sectionElement: '',
      docType: '',
      searchName: 'SECT_Portfolio_Turnover',
      hasUpdateTotalSearch: true,
    };
  }

  static getSearch(): Search {
    return {
      conditions: {
        includeTexts: {
          conditionType: SearchConditionType.OR,
          texts: [
            {
              name: 'Portfolio Turnover:',
            },
          ],
        },
        excludeTexts: {
          conditionType: SearchConditionType.OR,
          texts: [],
        },
        includeTags: {
          conditionType: SearchConditionType.OR,
          texts: [],
        },
        excludeTags: {
          conditionType: SearchConditionType.OR,
          texts: [],
        },
      },
      sectionElement: '',
      docType: '',
      searchName: 'SECT_Portfolio_Turnover',
      hasUpdateTotalSearch: true,
    };
  }

  static getContentQueryResultDto(
    textID: string,
    binderID: string,
    binderName: string,
    textSec: string,
    topic: string,
    tags: string[],
    text: string
  ): ContentQueryResultDto {
    return {
      textID,
      binderID,
      binderRank: {
        low: 33829,
        high: 0,
      },
      binderName,
      docType: 'Import',
      version: {
        low: 43804606,
        high: 376,
      },
      textSec,
      total: {
        low: 320,
        high: 0,
      },
      topic,
      textIndex: 295,
      tags,
      nro: 1,
      text,
      inlineStyleRanges: [],
    };
  }

  static getContentQueryResult(
    textID: string,
    binderID: string,
    binderName: string,
    textSec: string,
    topic: string,
    tags: string[],
    text: string
  ): ContentQueryResult {
    return {
      textID,
      binderID,
      binderRank: {
        low: 33829,
        high: 0,
      },
      binderName,
      docType: 'Import',
      version: {
        low: 43804606,
        high: 376,
      },
      textSec,
      total: {
        low: 320,
        high: 0,
      },
      topic,
      textIndex: 295,
      tags,
      nro: 1,
      text,
      inlineStyleRanges: [],
    };
  }
}
