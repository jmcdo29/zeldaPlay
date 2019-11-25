import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleGuard } from '../guards/google.guard';
import { IsLoggedInGuard } from '../guards/is-logged-in.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  async googleLogin() {}

  @UseGuards(GoogleGuard)
  @Redirect('/api/auth/test-login')
  @Get('google/callback')
  async googleCallback(@Req() req: any) {
    return req.user;
  }
}
