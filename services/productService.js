const productModel = require('../models/productModel');

const validateProduct = async ({ name, quantity }) => {
  if (name.length < 5) {
    return ({ error: true, message: '"name" length must be at least 5 characters long' });
  }

  const exists = await productModel.getProductByName(name);
  if (exists) {
    return ({ error: true, message: 'Product already exists' });
  }

  if (quantity <= 0) {
    return ({ error: true, message: '"quantity" must be larger than or equal to 1' });
  }

  if (typeof quantity !== 'number') {
    return ({ error: true, message: '"quantity" must be a number' });
  }
};

const addProduct = async ({ name, quantity }) => {
  const validate = await validateProduct({ name, quantity });

  if (validate.error) {
    return validate;
  }

  const result = await productModel.add(name, quantity);
  return ({ _id: result.insertedId, name, quantity });
};

module.exports = {
  addProduct,
};
