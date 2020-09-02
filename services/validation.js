const Joi = require('joi');

const { getProductByName } = require('../models/productsModel');

const errorResponses = {
  invalid_data: { message: 'Product already exists' },
  invalid_name: { message: '\'name\' length must be at least 5 characters long' },
  invalid_quantity: { message: '\'quantity\' must be larger than or equal 1' },
};

const productSchema = (name, quantity) => {
  const validationSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  });

  const validation = validationSchema.validate({ name, quantity });

  const { error } = validation;

  return error || null;
};

const productRegistryValidation = async (name, quantity) => {
  const validation = productSchema(name, quantity);
  const key = validation && validation.details[0].context.key;
  if (key && key === 'name') {
    return errorResponses.invalid_name;
  }

  if (key && key === 'quantity') {
    return errorResponses.invalid_quantity;
  }

  const nameCheck = await getProductByName(name);

  if (nameCheck) {
    return errorResponses.invalid_data;
  }

  return false;
};

const productUpdateValidation = async (name, quantity) => {
  const updateValidation = productSchema(name, quantity);
  const updateKey = updateValidation && updateValidation.details[0].context.key;
  if (updateKey && updateKey === 'name') {
    return errorResponses.invalid_name;
  }

  if (updateKey && updateKey === 'quantity') {
    return errorResponses.invalid_quantity;
  }

  return false;
};

module.exports = {
  productRegistryValidation,
  productUpdateValidation,
};
