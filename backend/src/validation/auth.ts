import Joi, { ObjectSchema } from 'joi';

export const registerUserSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginUserSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestResetEmailSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema: ObjectSchema = Joi.object({
  newPassword: Joi.string().required(),
  token: Joi.string().required(),
});
