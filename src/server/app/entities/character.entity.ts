import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Base } from '@Entity/base.entity';
import { Note } from '@Entity/note.entity';
import { Save } from '@Entity/save.entity';
import { Skill } from '@Entity/skill.entity';
import { Spell } from '@Entity/spell.entity';
import { User } from '@Entity/user.entity';
import { Weapon } from '@Entity/weapon.entity';

@Entity()
export class Character extends Base {
  idStart = '00C';

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @Column()
  race: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  subrace?: string;

  @ApiModelProperty()
  @Column('int')
  strength: number;

  @ApiModelProperty()
  @Column('int')
  dexterity: number;

  @ApiModelProperty()
  @Column('int')
  constitution: number;

  @ApiModelProperty()
  @Column('int')
  intelligence: number;

  @ApiModelProperty()
  @Column('int')
  wisdom: number;

  @ApiModelProperty()
  @Column('int')
  charisma: number;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  ac?: number;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  flat_footed?: number;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  touch?: number;

  @ApiModelProperty()
  @Column('int')
  health: number;

  @ApiModelProperty()
  @Column('int')
  max_health: number;

  @ApiModelProperty()
  @Column('int')
  magic: number;

  @ApiModelProperty()
  @Column('int')
  max_magic: number;

  @ApiModelProperty()
  @Column('int')
  experience: number;

  @ApiModelProperty()
  @Column({ nullable: true })
  size?: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  craft_one?: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  craft_two?: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  profession?: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  performance?: string;

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;

  @ApiModelProperty()
  @Column()
  @Column('int')
  level: number;

  @ApiModelProperty({ type: Skill, isArray: true })
  @OneToMany((type) => Skill, (skill) => skill.character, { cascade: true })
  skills?: Skill[];

  @OneToMany((type) => Weapon, (weapon) => weapon.character, { cascade: true })
  weapons?: Weapon[];

  @OneToMany((type) => Spell, (spell) => spell.character, { cascade: true })
  spells?: Spell[];

  @OneToMany((type) => Note, (note) => note.character, { cascade: true })
  notes?: Note[];

  @ApiModelProperty({ type: Save, isArray: true })
  @OneToMany((type) => Save, (save) => save.character, { cascade: true })
  saves?: Save[];
}
