import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiImplicitBody,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';

import { AuthService } from '@Auth/auth.service';
import { JwtReturnDTO, NewUserDTO, UserDTO } from '@Body/index';
import { DbQuestion } from '@Db/models';
import { Observable, of } from 'rxjs';

@ApiUseTags('Sign In/ Sign Up/ Sign Out')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ title: 'Login', description: 'Log the user in' })
  @ApiImplicitBody({ name: 'user', type: UserDTO })
  @ApiOkResponse({ type: JwtReturnDTO })
  login(@Body('user') user: UserDTO): Observable<JwtReturnDTO> {
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiOperation({ title: 'Signup', description: 'Sign the new user up' })
  @ApiImplicitBody({ name: 'user', type: NewUserDTO })
  @ApiOkResponse({ type: JwtReturnDTO })
  signup(@Body('user') user: NewUserDTO): Observable<JwtReturnDTO> {
    return this.authService.signup(user);
  }

  @Post('logout')
  @ApiOperation({ title: 'Logout', description: 'Allow the user to log out.' })
  logout(): void {
    return;
  }

  @Get('questions')
  getQuestions(): Observable<DbQuestion[]> {
    return of([]);
  }
}
