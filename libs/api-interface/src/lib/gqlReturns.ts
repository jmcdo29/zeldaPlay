import { Int } from 'type-graphql';
import { AbilityScore, AbilityScoreInput } from './abilityScore';
import { Auth } from './auth';
import { Character } from './character';
import { Message } from './interfaces';
import { User } from './user';

// For @Resolver() decorators
export const ofAbilityScore = (of) => AbilityScore;
export const ofAuth = (of) => Auth;
export const ofCharacter = (of) => Character;
export const ofMessage = (of) => Message;
export const ofUser = (of) => User;
// For @Query() and @Mutation() decorators
export const returnAbilityScore = (returns) => AbilityScore;
export const returnAbilityScores = (returns) => [AbilityScore];
export const returnAuth = (returns) => Auth;
export const returnCharacter = (returns) => Character;
export const returnCharacterArray = (returns) => [Character];
export const returnMessage = (returns) => Message;
export const returnUser = (returns) => User;
export const returnString = (returns) => String;
// For @Args() decorator
export const typeString = () => String;
export const typeInt = () => Int;
export const typeAbilityScoreInputs = () => [AbilityScoreInput];
