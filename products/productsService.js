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

const getProductByIdArray = async (ids) => {
  let allIdsIsValid = true;
  const products = await Promise.all(
    ids.map(async ({ productId }) => {
      const product = await getProductById(productId);
      if (!product) allIdsIsValid = false;
      return product;
    }),
  );
  return { products, allIdsIsValid };
};

const addProduct = async (name, quantity) => {
  const product = await productsModel.addProduct(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  await productsModel.updateProduct(id, name, quantity);
  return { _id: id, name, quantity };
};

const updateStock = async (id, quantity) => {
  await productsModel.updateStock(id, quantity);
  return { _id: id, quantity };
};

const deleteProduct = (id) => productsModel.deleteProduct(id);

module.exports = {
  getAllProducts,
  addProduct,
  validateProduct,
  getProductById,
  validateId,
  updateProduct,
  deleteProduct,
  getProductByIdArray,
  updateStock,
};
