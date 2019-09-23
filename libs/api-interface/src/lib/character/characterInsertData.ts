import { Character } from './character';
export interface CharacterInsertData extends Partial<Character> {
  name: string;
  race: string;
  subrace: string;
  experience: number;
  maxHealth: number;
  health: number;
  isDead: boolean;
  playerId: string;
  level: number;
  alignment: string;
  background: string;
  ideal: string;
  bond: string;
  flaw: string;
  personalityTraits: string[];
  proficiencies: string[];
  languages: string[];
  game: string;
}
