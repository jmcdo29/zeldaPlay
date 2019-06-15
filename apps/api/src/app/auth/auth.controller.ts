import { Controller, Post } from '@nestjs/common';
import { LoginBody, SignupBody } from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(loginBody: LoginBody): Observable<string> {
    return this.authService.login(loginBody);
  }

  @Post('signup')
  signup(signupBody: SignupBody): Observable<string> {
    return this.authService.signup(signupBody);
  }
}
