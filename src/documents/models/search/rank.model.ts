import { AutoMap } from 'nestjsx-automapper';

export class Rank {
  @AutoMap()
  low: number;

  @AutoMap()
  high: number;
}
