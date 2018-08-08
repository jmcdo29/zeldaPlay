/**
 * @prop {string} [id]
 * @prop {number} ranks - number of points put into the skill
 * @prop {string} [racial] - racial bonus for the skill, if it exists
 * @prop {string} [item] - item bonus for the skill, if it exists
 * @prop {string} [misc] - miscellaneous bonus for the skill, if it exists
 * @prop {boolean} trained - if the Character is trained in the skill
 * @prop {string} skillName
 * @prop {string} modifier - the modifier to use when rolling skill checks
 */
 export interface SkillInterface {
  id?: string;
  ranks: number;
  racial?: string;
  item?: string;
  misc?: string;
  trained: boolean;
  skillName: string;
  modifier?: string;
 }
