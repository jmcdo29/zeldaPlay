import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { AttributeDTO, SaveDTO, SkillDTO } from '@Body/index';
import { IsId } from '@Decorators/index';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min
} from 'class-validator';

export class CharacterDTO {
  @ApiModelPropertyOptional()
  @IsId('00C', { message: 'Invalid character id.' })
  readonly id?: string;

  @ApiModelProperty()
  @IsNumber()
  readonly level: number;

  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsIn([
    'Fairy',
    'Gerudo',
    'Goron',
    'Hylian',
    'Rito',
    'Shiekah',
    'Twili',
    'Zora'
  ])
  readonly race: string;

  @ApiModelPropertyOptional()
  readonly subRace?: string;

  @ApiModelProperty({ type: [AttributeDTO] })
  readonly attributes: AttributeDTO[];

  @ApiModelProperty()
  @IsNumber()
  @Min(0)
  @Max(this.maxHealth)
  readonly health: number;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  readonly maxHealth: number;

  @ApiModelProperty()
  @IsNumber()
  @Min(0)
  @Max(this.maxHealth)
  readonly magic: number;

  @ApiModelProperty()
  @IsPositive()
  @IsNumber()
  readonly maxMagic: number;

  @ApiModelProperty()
  @IsNumber()
  @Min(0)
  readonly exp: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly craftOne?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly craftTwo?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly performCust?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly profession?: string;

  @ApiModelPropertyOptional({ type: [SkillDTO] })
  @IsOptional()
  readonly skills?: SkillDTO[];

  @ApiModelPropertyOptional({ type: [SkillDTO] })
  @IsOptional()
  readonly weaponSkills?: SkillDTO[];

  @ApiModelPropertyOptional({ type: [SkillDTO] })
  @IsOptional()
  readonly magicSkills?: SkillDTO[];

  @ApiModelProperty({ type: [SaveDTO] })
  @IsOptional()
  readonly savingThrows: SaveDTO[];
}
