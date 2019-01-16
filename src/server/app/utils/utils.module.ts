import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Module({
  providers: [UtilsService]
})
export class UtilsModule {}
