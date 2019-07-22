import { Args, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { MessageDTO, ofMessage, returnMessage, typeString } from './models';

@Resolver(ofMessage)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(returnMessage)
  sayHello(
    @Args({ name: 'data', type: typeString, nullable: true }) data?: string,
  ): MessageDTO {
    return this.appService.getData(data);
  }
}
