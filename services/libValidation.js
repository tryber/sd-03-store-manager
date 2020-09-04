const validateParams = async (productId, quantity) => {
  // name = name || productsById;
  if (quantity < 1) {
    return {
      err:
        { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  if (quantity === 0) {
    return {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  if (typeof quantity !== 'number') {
    return {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  return false;
};

module.exports = { validateParams };
