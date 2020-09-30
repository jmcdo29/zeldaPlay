import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ReqWithUser } from '../interfaces/req-with-user.interface';
import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO, SignupDTO } from './models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  localLogin(
    @Req() req: ReqWithUser,
    @Body() loginBody: LoginDTO,
  ): Observable<AuthDTO> {
    return this.authService.login(req, loginBody);
  }

  @Post('signup')
  signup(
    @Req() req: ReqWithUser,
    @Body() signupBody: SignupDTO,
  ): Observable<AuthDTO> {
    return this.authService.signup(req, signupBody);
  }

  @Get('logout')
  logout() {
    return 'logged out';
  }
}
