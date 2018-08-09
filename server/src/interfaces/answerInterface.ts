/**
 * @export
 * @interface IAnswer
 * @prop {string} [id]
 * @prop {string} question - question related to the answer
 * @prop {string} answer - answer to the question
 */
export interface IAnswer {
  id?: string;
  question: string;
  answer: string;
}
