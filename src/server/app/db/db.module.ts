import { Global, Module, Provider } from '@nestjs/common';
import { DbService } from './db.service';

const dbProvider: Provider = {
  provide: 'DbService',
  useFactory: async () => {
    return new DbService();
  }
};

@Global()
@Module({
  providers: [dbProvider],
  exports: [DbService]
})
export class DbModule {}
