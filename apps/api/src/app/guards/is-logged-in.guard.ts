import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest(context);
    return request.isAuthenticated();
  }

  getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest();
  }
}
