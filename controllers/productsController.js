const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const newProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const result = await productsService.add({ name, quantity });

  if (result.error) return res.status(422).json({ message: result.error });

  return res.status(201).json(result);
});

module.exports = { newProduct };
