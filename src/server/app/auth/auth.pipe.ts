import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe
} from '@nestjs/common';

import { NewUserDTO } from '@Auth/interfaces/new_user.dto';

@Injectable()
export class AuthPipe extends ValidationPipe
  implements PipeTransform<NewUserDTO, Promise<NewUserDTO>> {
  async transform(
    value: NewUserDTO,
    metadata: ArgumentMetadata
  ): Promise<NewUserDTO> {
    const pass = value.password;
    const errors = [];
    if (pass !== value.confirmationPassword) {
      errors.push('Password and Confirmation Password must match.');
    }
    if (pass.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]+/.test(pass)) {
      errors.push('Password must contain at least one upper case character.');
    }
    if (!/[a-z]+/.test(pass)) {
      errors.push('Password must contain at least one lower case character.');
    }
    if (!/\d+/.test(pass)) {
      errors.push('Password must contain at least one digit.');
    }
    if (!/[!@#$%^&*\(\)\-\_+]+/.test(pass)) {
      errors.push(
        'Password must contain at least one special character (!@#$%^&*_-+).'
      );
    }
    if (/\s/.test(pass)) {
      errors.push('Password should not contain any spaces.');
    }
    if (errors.length > 0) {
      let errStr = '';
      errors.forEach((error) => {
        errStr += error + ' ';
      });
      throw new BadRequestException(errStr);
    }
    return value;
  }
}
