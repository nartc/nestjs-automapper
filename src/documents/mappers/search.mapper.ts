import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile } from "@automapper/types";
import { Injectable } from "@nestjs/common";
import { SearchConditionDto, SearchConditionElementDto, SearchConditionsDto, SearchDto } from "../dtos";
import { Search, SearchCondition, SearchConditionElement, SearchConditions } from "../models";

@Injectable()
export class SearchMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);

  }

  mapProfile(): MappingProfile {
    return mapper => {
      mapper.createMap(SearchConditionElementDto, SearchConditionElement);
      mapper.createMap(SearchConditionDto, SearchCondition);
      mapper.createMap(SearchConditionsDto, SearchConditions);
      mapper.createMap(SearchDto, Search);
    };
  }
}
