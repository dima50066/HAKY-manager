import Joi from "joi";

export const profileSchema = Joi.object({
  avatar: Joi.alternatives()
    .try(Joi.string().uri().optional(), Joi.string().optional())
    .allow(null),
  isStudent: Joi.boolean().optional(),
  productivity: Joi.number().min(100).max(125).optional(),
  bio: Joi.string().max(500).optional(),
  location: Joi.string().max(100).optional(),
  birthDate: Joi.date().optional(),
  livesIndependently: Joi.boolean().optional(),
  peselNumber: Joi.string().max(11).optional().messages({
    "string.max": "PESEL number cannot exceed 11 characters",
  }),
  address: Joi.string().max(200).optional().messages({
    "string.max": "Address cannot exceed 200 characters",
  }),
  emergencyContactNumber: Joi.string().max(15).optional().messages({
    "string.max": "Emergency contact number cannot exceed 15 characters",
  }),
});

export const documentSchema = Joi.object({
  newDocumentName: Joi.string().max(100).optional().messages({
    "string.max": "New document name cannot exceed 100 characters",
  }),
});
