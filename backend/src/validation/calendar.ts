import Joi from "joi";

export const requestSchema = Joi.object({
  type: Joi.string()
    .valid("vacation", "day-off", "work-day")
    .required()
    .messages({
      "any.required": "Type is required",
      "string.base": "Type must be a string",
      "any.only": "Type must be one of: 'vacation', 'day-off', 'work-day'",
    }),
  date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid date",
    "date.iso": "Date must be in ISO format (e.g., 2024-11-25)",
    "any.required": "Date is required",
  }),
  endDate: Joi.date().iso().greater(Joi.ref("date")).messages({
    "date.base": "End date must be a valid date",
    "date.iso": "End date must be in ISO format (e.g., 2024-11-25)",
    "date.greater": "End date must be after the start date",
  }),
});
