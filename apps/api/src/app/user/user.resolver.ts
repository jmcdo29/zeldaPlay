import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  User,
  UserId,
  UserUpdateData
} from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User, { name: 'user' })
  getUser(@Args() userId: UserId): Observable<User> {
    return this.userService.getById(userId);
  }

  @Mutation((returns) => User, { name: 'updateUser' })
  updateUser(
    @Args('userId') id: UserId,
    @Args('updateUserData') userData: UserUpdateData
  ): Observable<User> {
    return this.userService.updateUser(userData, id);
  }

  @Mutation((returns) => String, { name: 'deleteUser' })
  deleteUser(@Args('userId') userId: UserId): Observable<any> {
    return this.userService.deleteUser(userId);
  }
}
