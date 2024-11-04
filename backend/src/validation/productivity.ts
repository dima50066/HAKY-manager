import Joi from 'joi';

export const productivitySchema = Joi.object({
  userId: Joi.string().required(),
  departmentId: Joi.string().required(),
  date: Joi.date().required(),
  unitsCompleted: Joi.number().min(0).required(),
});
