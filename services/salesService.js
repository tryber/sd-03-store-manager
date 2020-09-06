const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const isQuantityValid = (quantity) => {
  let output = true;
  if (!Number.isInteger(quantity)) {
    output = {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  if (typeof quantity !== 'number') {
    output = {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  if (quantity <= 0) {
    output = {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  return output;
};

const addSale = async (soldItensArray) => {
  const { productId, quantity } = soldItensArray[0];

  const quantityValidation = isQuantityValid(quantity);

  if (quantityValidation.err) return quantityValidation;

  const product = await productsService.getProductById(productId);

  if (quantity > product.quantity) {
    return {
      err:
        { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  return salesModel.addSale(soldItensArray);
};

module.exports = {
  addSale,
};
