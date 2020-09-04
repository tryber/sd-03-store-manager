const { validate } = require('@expresso/validator');
const productsModel = require('./productsModel');

const productsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 5,
    },
    quantity: {
      type: 'integer',
      minimum: 0,
    },
  },
  additionalProperties: false,
  required: ['name', 'quantity'],
};

const validateProduct = validate(productsSchema);

const getAllProducts = () => productsModel.getAllProducts();

const addProduct = async (name, quantity) => {
  const product = await productsModel.add(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

module.exports = {
  getAllProducts,
  addProduct,
  validateProduct,
};
