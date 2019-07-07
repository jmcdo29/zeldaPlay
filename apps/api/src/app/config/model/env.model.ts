import * as Joi from 'joi';

export const envVarSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(['production', 'prod', 'dev', 'development', 'test'])
    .default('dev'),
  PORT: Joi.number().default(3333),
  DATABASE_URL: Joi.string()
    .uri()
    .required(),
  GLOBAL_PREFIX: Joi.string().default('api'),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.string().default(3600),
  RATE_LIMIT: Joi.number().default(100)
});
