import { createParamDecorator } from '@nestjs/common';

export const UserDec = createParamDecorator((data, req) => {
  return req.user;
});
