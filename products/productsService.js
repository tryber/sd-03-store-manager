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

const validateId = (id) => id && id.length === 24;

const getAllProducts = async () => ({ products: await productsModel.getAllProducts() });

const getProductById = (id) => productsModel.getProductById(id);

const addProduct = async (name, quantity) => {
  const product = await productsModel.add(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  await productsModel.update(id, name, quantity);
  return { _id: id, name, quantity };
};

module.exports = {
  getAllProducts,
  addProduct,
  validateProduct,
  getProductById,
  validateId,
  updateProduct,
};
