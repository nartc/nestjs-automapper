import { AutoMap } from 'nestjsx-automapper';
import { SearchConditions } from './search-conditions.model';

export class Search {
  @AutoMap(() => SearchConditions)
  conditions: SearchConditions;

  @AutoMap()
  sectionElement: string;

  @AutoMap()
  docType: string;

  @AutoMap()
  searchName: string;

  @AutoMap()
  hasUpdateTotalSearch: boolean;
}
