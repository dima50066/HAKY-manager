import Joi from "joi";

export const profileSchema = Joi.object({
  avatar: Joi.alternatives()
    .try(Joi.string().uri().optional(), Joi.string().optional())
    .allow(null)
    .messages({
      "string.uri": "Avatar must be a valid URL",
    }),
  isStudent: Joi.boolean().optional(),
  productivity: Joi.number().min(100).max(125).optional(),
  bio: Joi.string().max(500).optional().messages({
    "string.max": "Bio cannot exceed 500 characters",
  }),
  location: Joi.string().max(100).optional().messages({
    "string.max": "Location cannot exceed 100 characters",
  }),
  birthDate: Joi.date().optional().messages({
    "date.base": "Birth date must be a valid date",
  }),
  livesIndependently: Joi.boolean().optional().messages({
    "boolean.base": "Lives independently must be a boolean",
  }),
});
