import { UseInterceptors } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  Message,
  ofMessage,
  returnMessage,
  typeString,
} from '@tabletop-companion/api-interface';
import { AppService } from './app.service';

@Resolver(ofMessage)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(returnMessage)
  sayHello(
    @Args({ name: 'data', type: typeString, nullable: true }) data?: string,
  ): Message {
    return this.appService.getData(data);
  }
}
