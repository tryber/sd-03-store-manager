const controllers = require('../controllers');

const validadeProduct = (name, quantity, sameProduct) => {
  let response;

  if (typeof name !== 'string' || name.length < 5) {
    response = { err: { message: '"name" length must be at least 5 characters long', code: 'invalid_data' } };
  } else if (sameProduct) {
    response = { err: { message: 'Product already exists', code: 'invalid_data' } };
  } else if (quantity <= 0) {
    response = { err: { message: '"quantity" must be larger than or equal to 1', code: 'invalid_data' } };
  } else if (typeof quantity !== 'number') {
    response = { err: { message: '"quantity" must be a number', code: 'invalid_data' } };
  }
  return response;
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const sameProduct = await controllers.productsController.sameProduct(name);
  // validações
  const response = validadeProduct(name, quantity, sameProduct);
  if (response) {
    return res.status(422).send(response);
  }

  const result = await controllers.productsController.createProduct(name, quantity);
  return res.status(201).send(result);
};

module.exports = {
  createProduct,
};
