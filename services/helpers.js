const invalid_data = 'invalid_data';

const validateProductData = (name, quantity) => {
  if (name && name.length < 5)
    return getErrorObject(invalid_data, '"name" length must be at least 5 characters long');

  if (quantity <= 0)
    return getErrorObject(invalid_data, '"quantity" must be larger than or equal to 1');

  if (typeof quantity !== 'number')
    return getErrorObject(invalid_data, '"quantity" must be a number');

  return true;
};

const validateId = (id, message) => {
  if (id.length < 24) return getErrorObject(invalid_data, message);

  return true;
};

const validateSaleData = (products) =>
  products.every(
    ({ productId, quantity }) =>
      quantity >= 1 && typeof quantity === 'number' && productId.length === 24,
  );

const getErrorObject = (code, message) => ({ err: { code, message } });

module.exports = {
  validateProductData,
  validateId,
  validateSaleData,
  getErrorObject,
};
