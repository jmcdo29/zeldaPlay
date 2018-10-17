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

  @Column()
  name: string;

  @Column()
  race: string;

  @Column({ nullable: true })
  subrace?: string;

  @Column('int')
  strength: number;

  @Column('int')
  dexterity: number;

  @Column('int')
  constitution: number;

  @Column('int')
  intelligence: number;

  @Column('int')
  wisdom: number;

  @Column('int')
  charisma: number;

  @Column({ type: 'int', nullable: true })
  ac?: number;

  @Column({ type: 'int', nullable: true })
  flat_footed?: number;

  @Column({ type: 'int', nullable: true })
  touch?: number;

  @Column('int')
  health: number;

  @Column('int')
  max_health: number;

  @Column('int')
  magic: number;

  @Column('int')
  max_magic: number;

  @Column('int')
  experience: number;

  @Column({ nullable: true })
  size?: string;

  @Column({ nullable: true })
  craft_one?: string;

  @Column({ nullable: true })
  craft_two?: string;

  @Column({ nullable: true })
  profession?: string;

  @Column({ nullable: true })
  performance?: string;

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;

  @Column()
  @Column('int')
  level: number;

  @OneToMany((type) => Skill, (skill) => skill.character, { cascade: true })
  skills?: Skill[];

  @OneToMany((type) => Weapon, (weapon) => weapon.character, { cascade: true })
  weapons?: Weapon[];

  @OneToMany((type) => Spell, (spell) => spell.character, { cascade: true })
  spells?: Spell[];

  @OneToMany((type) => Note, (note) => note.character, { cascade: true })
  notes?: Note[];

  @OneToMany((type) => Save, (save) => save.character, { cascade: true })
  saves?: Save[];
}
