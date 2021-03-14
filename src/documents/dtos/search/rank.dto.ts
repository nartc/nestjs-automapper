import { IsNotEmpty, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class RankDto {
  @ApiProperty({
    description: 'The low value of the rank',
    required: true,
  })
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  low: number;

  @ApiProperty({
    description: 'The high value of the rank',
    required: true,
  })
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  high: number;
}
