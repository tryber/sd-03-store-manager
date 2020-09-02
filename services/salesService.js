const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const createSale = (products) => {
  console.log(products);
  const isDataValid = products.every(
    ({ productId, quantity }) =>
      quantity >= 1 && typeof quantity === 'number' && productId.length === 24,
  );

  if (isDataValid) {
    products.forEach(({ productId }) => {
      const product = productsModel.getProductById(productId);
      if (!product) {
        return {
          err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
        };
      }
    });
  } else if (!isDataValid) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  const sale = salesModel.createSale(products);

  return sale;
};

module.exports = {
  createSale,
};

/* products.forEach(({ productId, quantity }) => {
    if (quantity <= 0 || typeof quantity !== 'number' || productId.length < 24) {
      console.log('if1');
      return {
        err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
      };
    }
    const product = productsModel.getProductById(productId);
    if (!product) {
      console.log('if2');
      return {
        err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
      };
    }
    return true;
  }); */
