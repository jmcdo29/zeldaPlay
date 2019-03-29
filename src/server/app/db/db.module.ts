import { Global, Module, Provider } from '@nestjs/common';
import { DbService } from './db.service';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService]
})
export class DbModule {}
