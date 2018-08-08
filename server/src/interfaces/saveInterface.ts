/**
 * @prop {string} [id] - the id of the save. Starts with 0St
 * @prop {string} name - Fortitude, Reflex, Will
 * @prop {number} [racial] - the racial bonus, if any
 * @prop {string} modifier - the modifier to be used for the save (Constitution, Wisdom, Dexterity)
 */
export interface SaveInterface {
  id?: string;
  name: string;
  racial?: number;
  modifier: string;
}
