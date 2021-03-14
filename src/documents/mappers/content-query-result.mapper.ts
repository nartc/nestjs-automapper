import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';
import { ContentQueryResult, Rank } from '../models';
import { ContentQueryResultDto, RankDto } from '../dtos';

@Profile()
export class ContentQueryResultMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ContentQueryResult, ContentQueryResultDto);
    mapper.createMap(Rank, RankDto);
  }
}
