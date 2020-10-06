const productsMiddleware = require('./productsMiddleware');
const salesMiddleware = require('./salesMiddleware');
const errorMiddleware = require('./errorMiddleware');

module.exports = {
  registerProduct: productsMiddleware.productCreate,
  listProducts: productsMiddleware.productsList,
  updateProduct: productsMiddleware.modifyProduct,
  deleteReadProduct: productsMiddleware.deleteReadProduct,
  registerSale: salesMiddleware.salesCreate,
  listSales: salesMiddleware.salesList,
  updateSale: salesMiddleware.modifySale,
  deleteReadSale: salesMiddleware.deleteReadSale,
  generateError: errorMiddleware.generateError,
};
