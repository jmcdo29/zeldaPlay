import { ApiModelProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsPositive, IsString } from 'class-validator';

export class AttributeDTO {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  readonly value: number;

  @ApiModelProperty()
  @IsString()
  @IsIn([
    'Stregnth',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
  ])
  readonly modifier: number;
}
