import { AutoMap } from '@automapper/classes';
import { SearchConditionElement } from './search-condition-element.model';
import { SearchConditionType } from '@shared/enums/search-condition-type.enum';

export class SearchCondition {
  @AutoMap(() => SearchConditionElement)
  texts: SearchConditionElement[];

  @AutoMap()
  conditionType: SearchConditionType;
}
