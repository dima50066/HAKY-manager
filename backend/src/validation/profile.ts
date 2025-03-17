import Joi from "joi";

export const createProfileSchema = Joi.object({
  avatar: Joi.alternatives().try(Joi.string().uri(), Joi.string()).allow(null),
  isStudent: Joi.boolean().required(),
  productivity: Joi.number().min(100).max(125).required(),
  location: Joi.string().max(100).optional(),
  birthDate: Joi.date().optional(),
  livesIndependently: Joi.boolean().required(),
  usesCompanyTransport: Joi.boolean().required(),
  peselNumber: Joi.string().max(11).optional(),
  address: Joi.string().max(200).optional(),
  emergencyContactNumber: Joi.string().max(15).optional(),
  language: Joi.string().valid("en", "uk", "pl", "ru").default("en"),
});

export const updateProfileSchema = Joi.object({
  avatar: Joi.alternatives().try(Joi.string().uri(), Joi.string()).allow(null),
  isStudent: Joi.boolean().optional(),
  productivity: Joi.number().min(100).max(125).optional(),
  location: Joi.string().max(100).optional(),
  birthDate: Joi.date().optional(),
  livesIndependently: Joi.boolean().optional(),
  usesCompanyTransport: Joi.boolean().optional(),
  peselNumber: Joi.string().max(11).optional(),
  address: Joi.string().max(200).optional(),
  emergencyContactNumber: Joi.string().max(15).optional(),
  language: Joi.string().valid("en", "uk", "pl", "ru").optional(),
});

export const documentSchema = Joi.object({
  newDocumentName: Joi.string().max(100).optional().messages({
    "string.max": "New document name cannot exceed 100 characters",
  }),
});
