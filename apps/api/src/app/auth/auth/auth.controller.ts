import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OgmaSkip } from '@ogma/nestjs-module';
import { GoogleGuard } from '../../guards/google.guard';
import { AuthDTO, LoginDTO, SignupDTO } from './models';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  async googleLogin() {
    return;
  }

  @OgmaSkip()
  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  localLogin(@Body() loginBody: LoginDTO): Observable<AuthDTO> {
    return this.authService.login(loginBody);
  }

  @Post('signup')
  signup(@Body() signupBody: SignupDTO): Observable<AuthDTO> {
    return this.authService.signup(signupBody);
  }
}
