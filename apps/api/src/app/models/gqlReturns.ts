import { Int } from 'type-graphql';
import { MessageDTO } from './message.graphql';

// For @Resolver() decorators
export const ofMessage = (of) => MessageDTO;
// For @Query() and @Mutation() decorators
export const returnMessage = (returns) => MessageDTO;
export const returnString = (returns) => String;
// For @Args() decorator
export const typeString = () => String;
export const typeInt = () => Int;
