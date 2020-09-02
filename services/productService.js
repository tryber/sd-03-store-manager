const controllers = require('../controllers');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const sameProduct = await controllers.productsController.sameProduct(name);
  // validações
  if (typeof name !== 'string' || name.length < 5) {
    return res.status(422).send({ err: { message: "\"name\" length must be at least 5 characters long", code: "invalid_data" } });
  }
  if (sameProduct) {
    return res.status(422).send({ err: { message: "Product already exists", code: "invalid_data" } });
  }
  if (quantity <= 0) {
    return res.status(422).send({ err: { message: "\"quantity\" must be larger than or equal to 1", code: "invalid_data" } });
  }
  if (typeof quantity !== 'number') {
    return res.status(422).send({ err: { message: "\"quantity\" must be a number", code: "invalid_data" } });
  }

  const result = await controllers.productsController.createProduct(name, quantity);
  return res.status(201).send(result);
}; 

module.exports = {
  createProduct,
};
