import { t } from '@deepkit/type';
import { LogLevel } from '@ogma/logger';

export class EnvConfig {
  @t
  NODE_ENV: 'production' | 'prod' | 'development' | 'dev' | 'test' =
    'development';

  @t.enum(LogLevel, true)
  LOG_LEVEL: LogLevel = LogLevel.INFO;

  @t
  DATABASE_URL: string;

  @t
  JWT_SECRET: string;

  @t
  SESSION_SECRET: string;

  @t
  REDIS_URL: string;

  @t
  GOOGLE_CLIENT: string;

  @t
  GOOGLE_SECRET: string;

  @t
  GOOGLE_CALLBACK_URL: string =
    'http://localhost:3333/api/oauth/google/callback';

  @t
  PORT: number = 3333;

  @t
  COOKIE_AGE: number = 86400;

  @t
  APPLICATION: string = 'tabletop';

  @t
  GLOBAL_PREFIX: string = 'api';

  @t
  GOOGLE_PROMPT: string = 'select_account';

  @t
  GOOGLE_RESPONSE_TYPE: string = 'code';

  @t
  GOOGLE_SCOPE: string = 'email profile';

  @t
  GOOGLE_STATE: string = 'some_state_token';
}
