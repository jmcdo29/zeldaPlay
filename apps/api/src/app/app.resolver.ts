import { Query, Resolver } from '@nestjs/graphql';
import {
  Message,
  ofMessage,
  returnMessage
} from '@tabletop-companion/api-interface';
import { AppService } from './app.service';

@Resolver(ofMessage)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(returnMessage)
  sayHello(): Message {
    return this.appService.getData();
  }
}
