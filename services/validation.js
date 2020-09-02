const Joi = require('joi');

const { getProductByName } = require('../models/productsModel');

const errorResponses = {
  invalid_data: { message: 'Product already exists' },
  invalid_name: { message: '"name" length must be at least 5 characters long' },
  invalid_quantity: { message: '"quantity" must be larger than or equal to 1' },
  invalid_quantity_type: { message: '"quantity" must be a number' },
};

// função de validação de requisição para os campos "name" e "quantity"
const productSchema = (name, quantity) => {
  const validationSchema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  });

  const validation = validationSchema.validate({ name, quantity });

  const { error } = validation;
  // se não houver erro retorna null e posso trabalhar a partir disso
  return error || null;
};

const checkProductsByName = async (name) => {
  const nameCheck = await getProductByName(name);
  if (!nameCheck) return false;

  return errorResponses.invalid_data;
};

const checkSchemaError = (key) => {
  if (key && key === 'name') {
    return errorResponses.invalid_name;
  }

  if (key && key === 'quantity') {
    return errorResponses.invalid_quantity;
  }

  return false;
};

const checkQuantityFieldType = (field, message) => (typeof field !== 'number' ? message : false);

const productRegistryValidation = async (name, quantity) => {
  const validation = productSchema(name, quantity);
  // Objeto de erro contem um array de objetos que contem a informação do campo inválido
  const key = validation && validation.details[0].context.key;

  const fieldQuantCheck = checkQuantityFieldType(quantity, errorResponses.invalid_quantity_type);
  const errorKeyCheck = checkSchemaError(key);
  const dataCheck = checkProductsByName(name);

  return fieldQuantCheck || errorKeyCheck || dataCheck || false;
};

const productUpdateValidation = async (name, quantity) => {
  const updateValidation = productSchema(name, quantity);
  const updateKey = updateValidation && updateValidation.details[0].context.key;

  const fieldQuantCheck = checkQuantityFieldType(quantity, errorResponses.invalid_quantity_type);
  const errorKeyCheck = checkSchemaError(updateKey);

  return fieldQuantCheck || errorKeyCheck || false;
};

module.exports = {
  productRegistryValidation,
  productUpdateValidation,
};
