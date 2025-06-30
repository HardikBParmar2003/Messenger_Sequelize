import joi from "joi";

export const logInValidation = joi.object({
  email: joi.string().required(),
  password:joi.string().required()
});

export const signUpValidation = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  password: joi
    .string()
    .min(6)
    .max(12)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password must be at most 12 characters long",
      "string.pattern.base":
        "Password must contain one upper case one lower case one number",
      "any.required": "Password is required",
    }),
});

export const updateValidation = joi.object({
    first_name: joi.string().optional(),
    last_name: joi.string().optional(),
    password: joi
      .string()
      .min(6)
      .max(12)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"))
      .optional()
      .messages({
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be at most 12 characters long",
        "string.pattern.base":
          "Password must contain one upper case one lower case one number",
        "any.required": "Password is required",
      }),  
      file: joi.object({
        mimetype: joi
          .string()
          .valid("image/png", "image/jpg", "image/jpeg")
          .required(),
        size: joi.number().max(1024000).required(),
      }).optional()
})
