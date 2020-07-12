import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthDTO, LoginDTO, SignupDTO } from './models';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ReqWithCookies } from '../../interfaces/req-with-cookies.interface';
import { CookieInterceptor } from '../../interceptors/cookie.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(CookieInterceptor)
  @Post('login')
  localLogin(
    @Req() req: ReqWithCookies,
    @Body() loginBody: LoginDTO,
  ): Observable<AuthDTO> {
    return this.authService.login(req, loginBody);
  }

  @UseInterceptors(CookieInterceptor)
  @Post('signup')
  signup(
    @Req() req: ReqWithCookies,
    @Body() signupBody: SignupDTO,
  ): Observable<AuthDTO> {
    return this.authService.signup(req, signupBody);
  }

  @Get('logout')
  logout() {
    return 'logged out';
  }
}
