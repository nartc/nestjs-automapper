import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class SearchConditionElementDto {
  @ApiProperty({
    description: 'The value of the search condition element',
    required: true,
  })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
