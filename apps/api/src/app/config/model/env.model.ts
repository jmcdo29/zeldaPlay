import * as Joi from 'joi';

export const envVarSchema = Joi.object({
  NODE_ENV: Joi.string().valid(['production', 'prod', 'dev', 'development', 'test']).default('development'),
  PORT: Joi.number().default(3333),
  DATABASE_URL: Joi.string().uri().required()
});