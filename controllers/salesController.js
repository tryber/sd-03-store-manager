const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const createSale = rescue(async (req, res) => {
  const products = req.body;
  const createdSales = await salesService.createSale(products);
  if (createdSales.err) {
    return res.status(422).json(createdSales);
  }
  return res.status(200).json(createdSales);
});

module.exports = {
  createSale,
};
