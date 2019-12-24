import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GraphQLModuleConfig implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createGqlOptions(): GqlModuleOptions {
    const isProd = this.configService.isProd;
    return {
      playground: !isProd,
      debug: !isProd,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    };
  }
}
