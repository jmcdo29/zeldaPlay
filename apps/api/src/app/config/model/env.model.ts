import { f } from '@marcj/marshal';
import { LogLevel } from '@ogma/logger';

export class EnvConfig {
  @f
  NODE_ENV: 'production' | 'prod' | 'development' | 'dev' | 'test' =
    'development';

  @f.enum(LogLevel, true)
  LOG_LEVEL: LogLevel = LogLevel.INFO;

  @f
  DATABASE_URL: string;

  @f
  JWT_SECRET: string;

  @f
  SESSION_SECRET: string;

  @f
  REDIS_URL: string;

  @f
  GOOGLE_CLIENT: string;

  @f
  GOOGLE_SECRET: string;

  @f
  GOOGLE_CALLBACK_URL: string =
    'http://localhost:3333/api/oauth/google/callback';

  @f
  PORT: number = 3333;

  @f
  COOKIE_AGE: number = 86400;

  @f
  APPLICATION: string = 'tabletop';

  @f
  GLOBAL_PREFIX: string = 'api';

  @f
  GOOGLE_PROMPT: string = 'select_account';

  @f
  GOOGLE_RESPONSE_TYPE: string = 'code';

  @f
  GOOGLE_SCOPE: string = 'email profile';

  @f
  GOOGLE_STATE: string = 'some_state_token';
}
