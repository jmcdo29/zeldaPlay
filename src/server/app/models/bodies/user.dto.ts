import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import {
  HasLowerCase,
  HasNumber,
  HasSpecialCharacter,
  HasUpperCase,
  NoWhiteSpace
} from '@Decorators/index';

export class UserDTO {
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @HasNumber({ message: 'Password must contain at least one digit.' })
  @HasUpperCase({
    message: 'Password must contain at least one upper case character.'
  })
  @HasLowerCase({
    message: 'Password must contain at least one lower case character.'
  })
  @HasSpecialCharacter({
    message:
      'Password must contain at least one special character (!@#$%^&*_-+).'
  })
  @NoWhiteSpace({ message: 'Password should not contain any spaces.' })
  @ApiModelProperty()
  readonly password: string;
}
