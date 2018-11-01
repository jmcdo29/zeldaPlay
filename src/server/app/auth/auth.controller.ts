import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiImplicitBody, ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { AuthPipe } from '@Auth/auth.pipe';
import { AuthService } from '@Auth/auth.service';
import { JwtReturnDTO } from '@Auth/interfaces/jwtReturn.dto';
import { NewUserDTO } from '@Auth/interfaces/new_user.dto';
import { UserDTO } from '@Auth/interfaces/user.dto';

@ApiUseTags('user')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ title: 'Login', description: 'Log the user in' })
  @ApiImplicitBody({ name: 'user', type: UserDTO })
  async login(@Body('user') user: UserDTO): Promise<JwtReturnDTO> {
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiOperation({ title: 'Signup', description: 'Sign the new user up' })
  @ApiImplicitBody({ name: 'user', type: NewUserDTO })
  async signup(
    @Body('user', AuthPipe) user: NewUserDTO
  ): Promise<JwtReturnDTO> {
    return this.authService.signup(user);
  }

  /* @Get('google/login')
  @ApiOperation({
    title: 'Google Login',
    description: 'Log user in using google'
  })
  async googleLogin(@Res() res: any) {
    return res.redirect(await this.authService.googleToken());
  }

  @Get('google/callback')
  @ApiOperation({
    title: 'Google Login Callback',
    description: 'Callback for Google OAuth login'
  })
  async googleCallback(@Query('code') code: string, @Query('scope') scope: string) {
    console.log('token', code);
    console.log('scope', scope);
    return this.authService.getGoogleUser({code});
  } */

  @Post('logout')
  @ApiOperation({ title: 'Logout', description: 'Allow the user to log out.' })
  async logout(): Promise<void> {
    return;
  }
}
