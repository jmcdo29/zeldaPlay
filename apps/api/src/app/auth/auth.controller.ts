import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginBody, SignupBody } from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginBody: LoginBody): Observable<string> {
    console.log(loginBody);
    return this.authService.login(loginBody);
  }

  @Post('signup')
  signup(@Body() signupBody: SignupBody): Observable<string> {
    return this.authService.signup(signupBody);
  }

  @Post('/logout')
  logout(@Req() req): void {
    req.logout();
    return;
  }
}
