import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest(context);
    return request.isAuthenticated();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
