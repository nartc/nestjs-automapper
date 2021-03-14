import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';
import {
  Search,
  SearchCondition,
  SearchConditionElement,
  SearchConditions
} from '../models';
import {
  SearchConditionDto,
  SearchConditionElementDto,
  SearchConditionsDto,
  SearchDto
} from '../dtos';

@Profile()
export class SearchMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(SearchConditionElementDto, SearchConditionElement);
    mapper.createMap(SearchConditionDto, SearchCondition);
    mapper.createMap(SearchConditionsDto, SearchConditions);
    mapper.createMap(SearchDto, Search);
  }

  static fromDtoToModel(searchDto: SearchDto): Search {
    return {
      conditions: searchDto.conditions,
      sectionElement: searchDto.sectionElement,
      searchName: searchDto.searchName,
      docType: searchDto.docType,
      hasUpdateTotalSearch: searchDto.hasUpdateTotalSearch,
    };
  }
}
