import Joi from 'joi';

export const productivitySchema = Joi.object({
  userId: Joi.string().required(),
  departmentId: Joi.string().required(),
  date: Joi.date().required(),
  unitsCompleted: Joi.number().min(0).required(),
  productivity: Joi.number().min(100).max(125).required(),
  isStudent: Joi.boolean().required(),
});
