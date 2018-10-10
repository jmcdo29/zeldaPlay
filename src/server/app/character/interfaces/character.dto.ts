import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { NoteDTO } from '../note/interfaces/note.dto';
import { SkillDTO } from '../skill/interfaces/skill.dto';
import { SpellDTO } from '../spell/interfaces/spell.dto';
import { WeaponDTO } from '../weapon/interfaces/weapon.dto';
import { AttributeDTO } from './attribute.dto';
import { SaveDTO } from './save.dto';

export class CharacterDTO {
  @ApiModelPropertyOptional()
  id?: string;

  @ApiModelProperty()
  level: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  race: string;

  @ApiModelPropertyOptional()
  subRace?: string;

  @ApiModelPropertyOptional()
  ac?: number;

  @ApiModelPropertyOptional()
  flat_footed?: number;

  @ApiModelPropertyOptional()
  touch?: number;

  @ApiModelPropertyOptional()
  size?: string;

  @ApiModelProperty()
  attributes: AttributeDTO[];

  @ApiModelProperty()
  health: number;

  @ApiModelProperty()
  maxHealth: number;

  @ApiModelProperty()
  magic: number;

  @ApiModelProperty()
  maxMagic: number;

  @ApiModelProperty()
  exp: number;

  @ApiModelPropertyOptional()
  craftOne?: string;

  @ApiModelPropertyOptional()
  craftTwo?: string;

  @ApiModelPropertyOptional()
  performCust?: string;

  @ApiModelPropertyOptional()
  profession?: string;

  @ApiModelPropertyOptional()
  skills?: SkillDTO[];

  @ApiModelPropertyOptional()
  weaponSkills?: SkillDTO[];

  @ApiModelPropertyOptional()
  magicSkills?: SkillDTO[];

  @ApiModelPropertyOptional()
  weapons?: WeaponDTO[];

  @ApiModelPropertyOptional()
  spells?: SpellDTO[];

  @ApiModelPropertyOptional()
  notes?: NoteDTO[];

  @ApiModelPropertyOptional()
  importantNotes?: NoteDTO[];

  @ApiModelProperty()
  savingThrows: SaveDTO[];
}
