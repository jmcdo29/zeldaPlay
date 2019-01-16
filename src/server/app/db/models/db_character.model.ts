import { Race } from './enums/races.enum';

export class DbCharacter {
  chId: string;
  chName: string;
  chRace: Race;
  chSubrace?: string;
  chStrength?: number;
  chDexterity?: number;
  chConstitution?: number;
  chIntelligence?: number;
  chWisdom?: number;
  chCharisma?: number;
  chLevel?: number;
  chExperience?: number;
  chHealth?: number;
  chHealthMax?: number;
  chMagic?: number;
  chMagicMax?: number;
  chPerformance?: string;
  chProfession?: string;
  chCraftOne?: string;
  chCraftTwo?: string;
}
