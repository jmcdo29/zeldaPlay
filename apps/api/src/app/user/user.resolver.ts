import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ofUser,
  returnString,
  returnUser,
  User,
  UserId,
  UserUpdateData
} from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Resolver(ofUser)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returnUser, { name: 'user' })
  getUser(@Args() userId: UserId): Observable<User> {
    return this.userService.getById(userId);
  }

  @Mutation(returnUser, { name: 'updateUser' })
  updateUser(
    @Args('userId') id: UserId,
    @Args('updateUserData') userData: UserUpdateData
  ): Observable<User> {
    return this.userService.updateUser(userData, id);
  }

  @Mutation(returnString, { name: 'deleteUser' })
  deleteUser(@Args('userId') userId: UserId): Observable<any> {
    return this.userService.deleteUser(userId);
  }
}
