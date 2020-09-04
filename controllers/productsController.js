const rescue = require('express-rescue');
const { shouldCreateProduct } = require('../service/productsService.js');

// o rescue faz exatamente o try catch e joga o erro, se tiver no next(error) que é capturado por
// um middleware de erro

// try {

// } catch (error) {
//   next(error);
// }

const productsRegister = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const product = await shouldCreateProduct(name, quantity);
  return res.status(201).json(product.ops[0]);
});

module.exports = {
  productsRegister,
};
