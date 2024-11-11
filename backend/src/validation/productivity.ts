import Joi from 'joi';
import { totalmem } from 'node:os';

export const productivitySchema = Joi.object({
  userId: Joi.string().required(),
  departmentId: Joi.string().required(),
  date: Joi.date().required(),
  unitsCompleted: Joi.number().min(0).required(),
  productivityLevel: Joi.number().min(100).max(125).required(),
  isStudent: Joi.boolean().required(),
});

export const productivityUpdateSchema = Joi.object({
  userId: Joi.string(),
  departmentId: Joi.string(),
  date: Joi.date(),
  unitsCompleted: Joi.number().min(0),
  productivityLevel: Joi.number().min(100).max(125),
  isStudent: Joi.boolean(),
}).min(1);
