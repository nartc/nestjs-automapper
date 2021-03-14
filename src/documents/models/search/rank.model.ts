import { AutoMap } from '@automapper/classes';

export class Rank {
  @AutoMap()
  low: number;

  @AutoMap()
  high: number;
}
