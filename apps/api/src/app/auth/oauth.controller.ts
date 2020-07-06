import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';
import { CookieInterceptor } from '../interceptors/cookie.interceptor';
import { ReqWithCookies } from '../interfaces/req-with-cookies.interface';
import { GoogleService } from './google/google.service';

@Controller('oauth')
export class OauthController {
  constructor(private readonly googleService: GoogleService) {}
  @Get('google/login')
  async googleLogin() {
    return this.googleService.getLoginUrl();
  }

  @Get('google/callback')
  @UseInterceptors(CookieInterceptor)
  async googleCallback(@Req() req: ReqWithCookies, @Query() queryParams: any) {
    return this.googleService.getUserProfile(req, queryParams.code);
  }
}
