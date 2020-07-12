import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';
import { CookieInterceptor } from '../interceptors/cookie.interceptor';
import { ReqWithCookies } from '../interfaces/req-with-cookies.interface';
import { AuthService } from './auth/auth.service';

@Controller('oauth')
export class OauthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google/login')
  async googleLogin() {
    return this.authService.getOauthLoginUrl('google');
  }

  @Get('google/callback')
  @UseInterceptors(CookieInterceptor)
  async googleCallback(@Req() req: ReqWithCookies, @Query() queryParams: any) {
    return this.authService.getGoogleUser(req, queryParams.code);
  }
}
