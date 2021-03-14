import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';
import { RankDto } from './rank.dto';

export class ContentQueryResultDto {
  @ApiProperty({
    description: 'The text identifier',
    required: true,
  })
  @AutoMap()
  @IsUUID(4)
  @IsNotEmpty()
  readonly textID: string;

  @ApiProperty({
    description: 'The binder identifier',
    required: true,
  })
  @AutoMap()
  @IsUUID(4)
  @IsNotEmpty()
  readonly binderID: string;

  @ApiProperty({
    description: 'The rank details of the binder',
    required: true,
  })
  @AutoMap(() => RankDto)
  @IsObject()
  @IsNotEmptyObject()
  readonly binderRank: RankDto;

  @ApiProperty({
    description: 'The name of the binder',
    required: true,
  })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  binderName: string;

  @ApiProperty({
    description: 'The type of the document',
    required: true,
  })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  docType: string;

  @ApiProperty({
    description: 'The rank details of the version',
    required: true,
  })
  @AutoMap(() => RankDto)
  @IsObject()
  @IsNotEmptyObject()
  version: RankDto;

  @ApiProperty({
    description: 'The section name of the text',
    required: true,
  })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  textSec: string;

  @ApiProperty({
    description: 'The rank details of the total',
    required: true,
  })
  @AutoMap(() => RankDto)
  @IsObject()
  @IsNotEmptyObject()
  total: RankDto;

  @ApiProperty({
    description: 'The topic of the text',
    required: true,
  })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiProperty({
    description: 'The index of the text',
    required: true,
  })
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  textIndex: number;

  @ApiProperty({
    description: 'The tags of the text',
    required: true,
  })
  @AutoMap()
  @IsArray()
  @IsNotEmpty()
  tags: string[];

  @ApiProperty({
    description: 'TODO',
    required: true,
  })
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  nro: number;

  @ApiProperty({
    description: 'The value of the text',
    required: true,
  })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'The inline style ranges of the text',
    required: true,
  })
  @AutoMap()
  @IsArray()
  @IsNotEmpty()
  inlineStyleRanges: string[];
}
