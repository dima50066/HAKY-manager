import Joi from "joi";

export const productivitySchema = Joi.object({
  userId: Joi.string().required(),
  department: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().optional(),
  }).required(),
  date: Joi.date().required(),
  unitsCompleted: Joi.number().min(0).required(),
  stopsCount: Joi.number().min(0).optional(),
  storeNumber: Joi.string().optional(),
  productivityLevel: Joi.number().min(100).max(125).required(),
  isStudent: Joi.boolean().required(),
});

export const productivityUpdateSchema = Joi.object({
  userId: Joi.string(),
  department: Joi.object({
    id: Joi.string(),
    name: Joi.string().allow("", null),
  }),
  date: Joi.date(),
  unitsCompleted: Joi.number().min(0),
  stopsCount: Joi.number().min(0).optional(),
  storeNumber: Joi.string().optional(),
  productivityLevel: Joi.number().min(100).max(125),
  isStudent: Joi.boolean(),
}).min(1);
