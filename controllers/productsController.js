const {
  productNameIsValid,
  productQuantityIsValid,
  productAlredyExists,
  addProduct,
  listProductsById,
  listAllProducts,
  updateProduct,
  deleteProduct,
  validateId,
} = require('../service/productsService.js');
const { ErrorHandler } = require('../utils/ErrorHandler');

const productsRegister = async (req, res, next) => {
  const { name, quantity } = req.body;
  const nameValid = productNameIsValid(name);
  const existProd = await productAlredyExists(name);
  const quantityValid = productQuantityIsValid(quantity);

  try {
    if (nameValid || existProd || quantityValid) {
      const errorMessage = nameValid || existProd || quantityValid;
      throw new ErrorHandler(422, errorMessage, 'invalid_data');
    }

    const product = await addProduct(name, quantity);
    return res.status(201).json(product.ops[0]);
  } catch (error) {
    next(error);
  }
};

const listProducts = async (_req, res, next) => {
  const allProducts = await listAllProducts();
  try {
    if (!allProducts) {
      throw new ErrorHandler(204, 'there is no products yet', 'invalid_data');
    }
    return res.status(200).json({ products: allProducts });
  } catch (error) {
    next(error);
  }
};

const listProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const idIsValid = validateId(id);
    if (idIsValid) {
      throw new ErrorHandler(422, idIsValid, 'invalid_data');
    }
    const productById = await listProductsById(id);
    return res.status(200).json(productById);
  } catch (error) {
    next(error);
  }
};

const updateProductsById = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const nameValid = productNameIsValid(name);
    const quantityValid = productQuantityIsValid(quantity);

    if (nameValid || quantityValid) {
      const errorMessage = nameValid || quantityValid;
      throw new ErrorHandler(422, errorMessage, 'invalid_data');
    }

    const { id } = req.params;
    await updateProduct(id, name, quantity);
    return res.status(200).json({ _id: id, name, quantity });
  } catch (error) {
    next(error);
  }
};

const deleteProductsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idIsValid = validateId(id);

    if (idIsValid) {
      throw new ErrorHandler(422, idIsValid, 'invalid_data');
    }

    const product = await deleteProduct(id);
    return res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  productsRegister,
  listProducts,
  listProductById,
  updateProductsById,
  deleteProductsById,
};
