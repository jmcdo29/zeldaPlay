import { Query, Resolver } from '@nestjs/graphql';
import { Message } from '@tabletop-companion/api-interface';
import { AppService } from './app.service';

@Resolver((of) => Message)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query((returns) => Message)
  sayHello(): Message {
    return this.appService.getData();
  }
}
