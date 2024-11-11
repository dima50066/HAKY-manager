import Joi from 'joi';

export const salarySchema = Joi.object({
  userId: Joi.string().required(),
  totalEarnings: Joi.number().min(0).required(),
  hoursWorked: Joi.number().min(0).required(),
  period: Joi.string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/)
    .required()
});
