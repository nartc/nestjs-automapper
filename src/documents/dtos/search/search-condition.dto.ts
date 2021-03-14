import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { SearchConditionElementDto } from './search-condition-element.dto';
import { SearchConditionType } from '@shared/enums/search-condition-type.enum';

export class SearchConditionDto {
  @ApiProperty({
    description: 'The elements of a search condition',
    isArray: true,
    required: true,
  })
  @AutoMap(() => SearchConditionElementDto)
  @IsArray()
  @IsNotEmpty()
  readonly texts: SearchConditionElementDto[];

  @ApiProperty({
    description: 'The condition type of a search condition',
    enum: SearchConditionType,
    required: true,
  })
  @AutoMap()
  @IsEnum(SearchConditionType)
  @IsNotEmpty()
  readonly conditionType: SearchConditionType;
}
