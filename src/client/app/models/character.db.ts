import { ISkillDb } from '#Models/skill.db';

export interface ICharacterQuery {
  chAc: number;
  chCharisma: number;
  chConstitution: number;
  chCraftOne: string;
  chCraftTwo: string;
  chDexterity: number;
  chExperience: number;
  chFlatFooted: number;
  chHealth: number;
  chHealthMax: number;
  chId: string;
  chIntelligence: number;
  chLevel: number;
  chMagic: number;
  chMagicMax: number;
  chName: string;
  chPerformance: string;
  chProfession: string;
  chRace: string;
  chSize: string;
  chStrength: number;
  chSubrace: string;
  chTouch: number;
  chWisdom: number;
  saves: Array<{
    saId?: string;
    saName: string;
    saModifier: string;
    saRacialBonus: number;
  }>;
  skills: ISkillDb[];
}
