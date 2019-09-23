import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CharacterResolver } from './character.resolver';
import { CharacterService } from './character.service';

@Module({
  imports: [AuthModule],
  providers: [CharacterResolver, CharacterService],
})
export class CharacterModule {}
