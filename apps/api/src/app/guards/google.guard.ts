import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    // added to be able to extend the authentication logic if need be
    const result = (await super.canActivate(context)) as boolean;
    const request = this.getRequest(context);
    await super.logIn(request);
    return result;
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
