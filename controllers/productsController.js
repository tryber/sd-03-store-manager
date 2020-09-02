const productModel = require('../model/productModel'); 

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productModel.createProductInDB(name, quantity);
  return res.send(result);
};

module.exports = {
  createProduct,
};
