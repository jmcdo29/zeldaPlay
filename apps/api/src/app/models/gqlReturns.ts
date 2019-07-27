import { Int } from 'type-graphql';
import { MessageDTO } from './message.graphql';

// For @Resolver() decorators
export const ofMessage = () => MessageDTO;
// For @Query() and @Mutation() decorators
export const returnMessage = () => MessageDTO;
export const returnString = () => String;
// For @Args() decorator
export const typeString = () => String;
export const typeInt = () => Int;
export const typeBoolean = () => Boolean;
export const typeStrings = () => [String];

export const nullable = { nullable: true };
