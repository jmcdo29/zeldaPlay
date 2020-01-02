import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { OgmaModuleOptions } from 'nestjs-ogma';
import { ConfigService } from '../config/config.service';

@Injectable()
export class OgmaModuleConfig
  implements ModuleConfigFactory<OgmaModuleOptions> {
  constructor(private readonly configService: ConfigService) {}

  createModuleConfig(): OgmaModuleOptions {
    return {
      service: {
        logLevel: this.configService.logLevel,
        color: !this.configService.isProd,
        application: this.configService.applicationName,
        json: this.configService.isProd,
      },
      interceptor: {
        format: 'dev',
        skip: (req: Request, res: Response) =>
          this.configService.isProd && res.statusCode < 400,
        getRequest: (context: ExecutionContext) => {
          if (context.getClass().name.includes('Controller')) {
            return context.switchToHttp().getRequest();
          }
          const ctx = GqlExecutionContext.create(context);
          return ctx.getContext().req;
        },
        getResponse: (context: ExecutionContext) => {
          if (context.getClass().name.includes('Controller')) {
            return context.switchToHttp().getResponse();
          }
          const ctx = GqlExecutionContext.create(context);
          return ctx.getContext().res;
        },
      },
    };
  }
}
