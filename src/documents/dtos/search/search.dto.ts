import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { SearchConditionsDto } from './search-conditions.dto';

export class SearchDto {
  @ApiProperty({ description: 'The conditions for the search', required: true })
  @AutoMap(() => SearchConditionsDto)
  @IsNotEmpty()
  readonly conditions: SearchConditionsDto;

  @ApiProperty({ description: 'The element of the section', required: false })
  @AutoMap()
  @IsString()
  readonly sectionElement: string;

  @ApiProperty({ description: 'The document type', required: false })
  @AutoMap()
  @IsString()
  readonly docType: string;

  @ApiProperty({ description: 'The search name', required: false })
  @AutoMap()
  @IsString()
  readonly searchName: string;

  @ApiProperty({
    description: 'If the total search needs to be updated',
    required: false,
  })
  @AutoMap()
  @IsBoolean()
  readonly hasUpdateTotalSearch: boolean;
}
