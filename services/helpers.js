const validateData = (name, quantity) => {
  if (name && name.length < 5) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }

  if (quantity <= 0) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };
  }
  return true;
};

const validateID = (id, msg = 'id') => {
  if (id.length < 24) {
    return { err: { code: 'invalid_data', message: `Wrong ${msg} format` } };
  }
  return true;
};

const validateSaleData = (products) =>
  products.every(
    ({ productId, quantity }) =>
      quantity >= 1 && typeof quantity === 'number' && productId.length === 24,
  );

module.exports = {
  validateData,
  validateID,
  validateSaleData,
};
