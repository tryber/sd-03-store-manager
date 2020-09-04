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
      minimum: 1,
    },
  },
  additionalProperties: false,
  required: ['name', 'quantity'],
};

const validateProduct = validate(productsSchema);

const getAllProducts = () => productsModel.getAllProducts();

const addProduct = (data) => {

};

module.exports = {
  getAllProducts,
  addProduct,
  validateProduct,
};
