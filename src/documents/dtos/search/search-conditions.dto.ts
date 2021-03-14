import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';
import { SearchConditionDto } from './search-condition.dto';

export class SearchConditionsDto {
  @ApiProperty({
    description: 'The condition when we want to include texts',
    required: true,
  })
  @AutoMap(() => SearchConditionDto)
  @IsNotEmpty()
  readonly includeTexts: SearchConditionDto;

  @ApiProperty({
    description: 'The condition when we want to exclude texts',
    required: true,
  })
  @AutoMap(() => SearchConditionDto)
  @IsNotEmpty()
  readonly excludeTexts: SearchConditionDto;

  @ApiProperty({
    description: 'The condition when we want to include tags',
    required: true,
  })
  @AutoMap(() => SearchConditionDto)
  @IsNotEmpty()
  readonly includeTags: SearchConditionDto;

  @ApiProperty({
    description: 'The condition when we want to exclude tags',
    required: true,
  })
  @AutoMap(() => SearchConditionDto)
  @IsNotEmpty()
  readonly excludeTags: SearchConditionDto;
}
