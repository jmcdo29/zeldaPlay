import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    // added to be able to extend the authentication logic if need be
    const result = (await super.canActivate(context)) as boolean;
    const request = this.getRequest(context);
    await super.logIn(request);
    return result;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    ctx.getContext().req.body = {
      ...ctx.getContext().req.body,
      ...ctx.getContext().req.body.variables,
    };
    return ctx.getContext().req;
  }
}
