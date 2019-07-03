import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Auth,
  Login,
  ofAuth,
  returnAuth,
  Signup
} from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Resolver(ofAuth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(returnAuth, { name: 'login' })
  login(@Args() loginBody: Login): Observable<Auth> {
    return this.authService.login(loginBody);
  }

  @Mutation(returnAuth, { name: 'signup' })
  signup(@Args('signupBody') signupBody: Signup): Observable<Auth> {
    return this.authService.signup(signupBody);
  }
}
