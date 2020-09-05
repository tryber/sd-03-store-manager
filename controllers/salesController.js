const services = require('../services');
const controller = require('./productsController');

const validateSales = (id, quantity) => {
  let response;

  if (controller.validateId(id)) {
    response = { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };
  }
  if (controller.validateEntries('Sales request', quantity)) {
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

module.exports = {
  createSale,
};
