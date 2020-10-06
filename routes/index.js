const productsMiddleware = require('./productsMiddleware');

module.exports = {
  registerProduct: productsMiddleware.productCreate,
  listProducts: productsMiddleware.productsList,
  updateProduct: productsMiddleware.modifyProduct,
  deleteReadProduct: productsMiddleware.deleteReadProduct,
};
