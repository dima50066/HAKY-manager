import Joi from "joi";

export const calendarEntrySchema = Joi.object({
  date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid date",
    "date.iso": "Date must be in ISO format (e.g., 2024-11-25)",
    "any.required": "Date is required",
  }),
  isWorkday: Joi.boolean().required().messages({
    "boolean.base": "isWorkday must be a boolean value",
    "any.required": "isWorkday is required",
  }),
});

export const calendarEntryDeleteSchema = Joi.object({
  date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid date",
    "date.iso": "Date must be in ISO format (e.g., 2024-11-25)",
    "any.required": "Date is required",
  }),
});
