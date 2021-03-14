import { AutoMap } from '@automapper/classes';
import { SearchCondition } from './search-condition.model';

export class SearchConditions {
  @AutoMap(() => SearchCondition)
  includeTexts: SearchCondition;

  @AutoMap(() => SearchCondition)
  excludeTexts: SearchCondition;

  @AutoMap(() => SearchCondition)
  includeTags: SearchCondition;

  @AutoMap(() => SearchCondition)
  excludeTags: SearchCondition;
}
