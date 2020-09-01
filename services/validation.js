const Joi = require('joi');

const productSchema = async (name, quantity) => {
  try {
    const validation = await Joi.object({
      name: Joi.string().alphanum().min(6).required(),
      quantity: Joi.number().integer().min(1).required(),
    }).validateAsync({ name, quantity });

    const { error } = validation;

    return error;
  } catch (error) {
    return error;
  }
};

module.exports = {
  productSchema,
};
