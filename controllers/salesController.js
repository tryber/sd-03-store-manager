const services = require('../services');
const productsController = require('./productsController');

const validateSales = (id, quantity) => {
  let response;

  if (productsController.validateId(id)) {
    response = { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };
  }
  if (productsController.validateEntries('Sales request', quantity)) {
    response = { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };
  }

  return response;
};

const createSale = async (req, res) => {
  const products = req.body;

  // validações
  let finalResponse;
  const response = products.map((e) => validateSales(e.productId, e.quantity));
  response.map((e) => {
    if (typeof e !== 'undefined') {
      finalResponse = e;
    }
    return null;
  });

  if (finalResponse) {
    return res.status(422).send(finalResponse);
  }

  const result = await services.saleService.createSale(products);
  return res.status(200).send(result);
};

const showAllSales = async (_req, res) => {
  const result = await services.saleService.showAllSales();
  return res.status(200).send({ sales: result });
};

const showSaleById = async (req, res) => {
  const { params } = req;
  const { id } = params;
  const validation = productsController.validateId(id);

  if (validation) {
    return res.status(422).send(validation);
  }

  const result = await services.saleService.getSaleById(id);
  return res.status(200).send(result);
};

module.exports = {
  createSale,
  showAllSales,
  showSaleById,
};
