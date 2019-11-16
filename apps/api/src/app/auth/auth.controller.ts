import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleGuard } from '../guards/google.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  async googleLogin() {}

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: Request) {
    return req.user;
  }
}
