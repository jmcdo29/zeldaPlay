import { Args, Query, Resolver } from '@nestjs/graphql';
import { Auth, Login, Signup } from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => Auth, { name: 'login' })
  login(@Args() loginBody: Login): Observable<Auth> {
    return this.authService.login(loginBody);
  }

  @Query((returns) => Auth, { name: 'signup' })
  signup(@Args() signupBody: Signup): Observable<Auth> {
    return this.authService.signup(signupBody);
  }
}
