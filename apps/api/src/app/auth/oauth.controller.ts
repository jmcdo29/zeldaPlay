import { Controller, Get, Query, Req } from '@nestjs/common';
import { ReqWithUser } from '../interfaces/req-with-user.interface';
import { AuthService } from './auth.service';
import { OauthQueryParams } from './models/oauth.model';

@Controller('oauth')
export class OauthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google/login')
  async googleLogin() {
    return this.authService.getOauthLoginUrl('google');
  }

  @Get('google/callback')
  async googleCallback(
    @Req() req: ReqWithUser,
    @Query() queryParams: OauthQueryParams,
  ) {
    return this.authService.getGoogleUser(
      req,
      queryParams.code,
      queryParams.state,
    );
  }
}
