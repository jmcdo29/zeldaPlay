import { INestApplication } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { SpelunkerModule } from 'nestjs-spelunker';
import { join } from 'path';
import { AppModule } from './app/app.module';

export async function goSpelunking(app: INestApplication): Promise<void> {
  const debugOutput = await SpelunkerModule.debug(AppModule);
  const exploreOutput = SpelunkerModule.explore(app);
  writeFileSync(join(process.cwd(), 'debug.json'), JSON.stringify(debugOutput));
  writeFileSync(
    join(process.cwd(), 'server.json'),
    JSON.stringify(exploreOutput),
  );
}
