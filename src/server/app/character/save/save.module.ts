import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';

@Module({
  controllers: [SaveController],
  providers: [SaveService]
})
export class SaveModule {}
