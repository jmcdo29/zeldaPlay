import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IsLoggedInGuard } from './is-logged-in.guard';

@Injectable()
export class GqlAuthGuard extends IsLoggedInGuard {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
