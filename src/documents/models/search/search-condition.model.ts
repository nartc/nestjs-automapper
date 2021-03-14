import { AutoMap } from 'nestjsx-automapper';
import { SearchConditionElement } from './search-condition-element.model';
import { SearchConditionType } from '@shared/enums/search-condition-type.enum';

export class SearchCondition {
  @AutoMap(() => SearchConditionElement)
  texts: SearchConditionElement[];

  @AutoMap()
  conditionType: SearchConditionType;
}
