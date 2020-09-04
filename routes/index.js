const createSalesDataMiddleware = require('./createSalesDataMiddleware');
const createProductsDataMiddlewares = require('./createProductsDataMiddlewares');

module.exports = {
  registerSale: createSalesDataMiddleware.salesCreate,
  listSales: createSalesDataMiddleware.salesList,
  updateSale: createSalesDataMiddleware.modifySale,
  deleteReadSale: createSalesDataMiddleware.deleteReadSale,
  registerProduct: createProductsDataMiddlewares.productCreate,
  listProducts: createProductsDataMiddlewares.productsList,
  updateProduct: createProductsDataMiddlewares.modifyProduct,
  deleteReadProduct: createProductsDataMiddlewares.deleteReadProduct,
};
