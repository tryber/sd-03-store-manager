const { productsModel } = require('../models');

const validateEachQuantity = async ({ productId, quantity }) => {
  const product = await productsModel.getProductById(productId);

  if (product[0].quantity - quantity <= 0) return 404;

  if (typeof quantity === 'string' || quantity <= 0) return 422;

  return true;
};

const saleValidation = async (sales) => {
  const validation = await Promise.all(sales.map(validateEachQuantity));

  if (validation.includes(422)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  if (validation.includes(404)) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }

  return true;
};

module.exports = {
  saleValidation,
};
