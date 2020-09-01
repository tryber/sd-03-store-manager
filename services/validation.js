const Joi = require('joi');

const productSchema = (name, quantity) => {
  const validationSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(6).required(),
    quantity: Joi.number().integer().min(1).required(),
  });

  const validation = validationSchema.validate({ name, quantity });

  const { error } = validation;

  return error;
};

module.exports = {
  productSchema,
};
