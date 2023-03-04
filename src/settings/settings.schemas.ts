import * as Joi from "joi";

export const validationSchema =  Joi.object({
  ENV: Joi.string().valid('production', 'development'),

  BACK_APP_URL: Joi.string().required(),
  FRONT_APP_URL: Joi.string().required(),

  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),

  TWITCH_CLIENT_ID: Joi.string().required(),
  TWITCH_CLIENT_SECRET: Joi.string().required(),
  
  FONDY_MERCHANT_ID: Joi.string().required(),
})