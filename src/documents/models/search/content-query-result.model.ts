import { AutoMap } from 'nestjsx-automapper';
import { Rank } from './rank.model';

export class ContentQueryResult {
  @AutoMap()
  textID: string;

  @AutoMap()
  binderID: string;

  @AutoMap(() => Rank)
  binderRank: Rank;

  @AutoMap()
  binderName: string;

  @AutoMap()
  docType: string;

  @AutoMap(() => Rank)
  version: Rank;

  @AutoMap()
  textSec: string;

  @AutoMap(() => Rank)
  total: Rank;

  @AutoMap()
  topic: string;

  @AutoMap()
  textIndex: number;

  @AutoMap()
  tags: string[];

  @AutoMap()
  nro: number;

  @AutoMap()
  text: string;

  @AutoMap()
  inlineStyleRanges: string[];
}
