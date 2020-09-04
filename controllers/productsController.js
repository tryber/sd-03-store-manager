const {
  productNameIsValid,
  productQuantityIsValid,
  productAlredyExists,
  addProduct,
  listProductsById,
  listAllProducts,
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
      throw new ErrorHandler(
        400, errorMessage, 'invalid_data',
      );
    }

    const product = await addProduct(name, quantity);
    return res.status(201).json(product.ops[0]);
  } catch (error) {
    next(error);
  }
};

const listProducts = async (req, res, next) => {
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
    const productById = await listProductsById(id);
    if (!productById) {
      throw new ErrorHandler(422, 'Product not found', 'invalid_data');
    }
    return res.status(200).json({ productById });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  productsRegister,
  listProducts,
  listProductById,
};
