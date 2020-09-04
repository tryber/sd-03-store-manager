const {
  createProduct,
  updateProduct,
  readOrDeleteById,
  listProducts,
} = require('../services/productsServices');
const { generateError } = require('../utils');

const productCreate = async (req, res, next) => {
  try {
    const product = await createProduct(req.body);

    if (product.message) throw new Error(product.message);

    return res.status(201).json(product);
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};

const modifyProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const product = await updateProduct(id, name, quantity);

    if (product.message) throw new Error(product.message);

    return res.status(200).json(product);
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};

const deleteReadProduct = (operation = 'read') => async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await readOrDeleteById(id, operation);

    return res.status(200).json(deletedProduct);
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};

const productsList = async (_req, res, next) => {
  try {
    const productslist = await listProducts();

    return res.status(200).json({ products: [...productslist] });
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};

module.exports = {
  productsList,
  deleteReadProduct,
  modifyProduct,
  productCreate,
};
