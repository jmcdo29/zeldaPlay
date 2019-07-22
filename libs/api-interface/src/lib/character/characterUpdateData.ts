import { Character } from './character';
export class CharacterUpdateData implements Partial<Character> {
  id: string;
  experience?: number;
  maxHealth?: number;
  health?: number;
  isDead?: boolean;
  level?: number;
  languages?: string[];
  proficiencies?: string[];
}
