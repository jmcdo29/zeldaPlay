/**
 * @prop {string} [id]
 * @prop {string} msg - the message of the note
 * @prop {boolean} important - if the note is marked as important or not. Defaults to false.
 * @prop {string} time - the time as a string that the note was created.
 */
export interface NoteInterface {
  id?: string;
  msg: string;
  important: boolean;
  time: string;
}
