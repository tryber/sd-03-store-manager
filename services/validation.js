const Joi = require('joi');

const { getProductByName, getProductById, updateProductById } = require('../models/productsModel');

const errorResponses = {
  invalid_data: { message: 'Product already exists' },
  invalid_name: { message: '"name" length must be at least 5 characters long' },
  invalid_quantity: { message: '"quantity" must be larger than or equal to 1' },
  invalid_quantity_type: { message: '"quantity" must be a number' },
  invalid_sale_data: { message: 'Wrong product ID or invalid quantity' },
  invalid_sale_quantity: { message: 'Such amount is not permitted to sell' },
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

// função de validação de requisição para os campos "productID" e "quantity"
const saleSchema = (id, quantity) => {
  const validationSchema = Joi.object({
    productId: Joi.string().alphanum().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
  });

  const validation = validationSchema.validate({ productId: id, quantity });

  const { error } = validation;
  return error || null;
};

const checkProductsByName = async (name, message = errorResponses.invalid_data) => {
  try {
    const nameCheck = await getProductByName(name);
    if (!nameCheck) return false;

    return message;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkProductsById = async (
  id,
  quantity,
  message1 = errorResponses.invalid_sale_data,
  message2 = errorResponses.invalid_sale_quantity,
) => {
  try {
    const idCheck = await getProductById(id);
    if (!idCheck) return message1;
    if (idCheck && idCheck.quantity - quantity < 0) return message2;
    if (idCheck && idCheck.quantity - quantity >= 0) {
      const newQuant = idCheck.quantity - quantity;
      await updateProductById(id, idCheck.name, newQuant);
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkProductSchemaError = (
  key,
  message1 = errorResponses.invalid_name,
  message2 = errorResponses.invalid_quantity,
) => {
  if (key && key === 'name') {
    return message1;
  }

  if (key && key === 'quantity') {
    return message2;
  }

  return false;
};

const checkSaleSchemaError = (key, message = errorResponses.invalid_sale_data) =>
  (key ? message : false);

const checkQuantityFieldType = (field, message = errorResponses.invalid_quantity_type) =>
  (typeof field !== 'number' ? message : false);

const productRegistryValidation = async (name, quantity) => {
  const validation = productSchema(name, quantity);
  // Objeto de erro contem um array de objetos que contem a informação do campo inválido
  const key = validation && validation.details[0].context.key;

  const fieldQuantCheck = checkQuantityFieldType(quantity);
  const errorKeyCheck = checkProductSchemaError(key);
  const dataCheck = await checkProductsByName(name);

  return fieldQuantCheck || errorKeyCheck || dataCheck || false;
};

const productUpdateValidation = async (name, quantity) => {
  try {
    const updateValidation = productSchema(name, quantity);
    const updateKey = updateValidation && updateValidation.details[0].context.key;

    const fieldQuantCheck = checkQuantityFieldType(quantity, errorResponses.invalid_quantity_type);
    const errorKeyCheck = checkProductSchemaError(updateKey);

    return fieldQuantCheck || errorKeyCheck || false;
  } catch (error) {
    throw new Error(error.message);
  }
};

const salesRegistryValidation = async (id, quantity) => {
  try {
    const salesValidation = saleSchema(id, quantity);
    const key = salesValidation && salesValidation.details[0].context.key;
    const errorKeyCheck = checkSaleSchemaError(key);
    const dataCheck = await checkProductsById(id, quantity);

    return errorKeyCheck || dataCheck || false;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  productRegistryValidation,
  productUpdateValidation,
  salesRegistryValidation,
};
