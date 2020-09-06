const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const createSale = rescue(async (req, res) => {
  const itensSold = req.body;
  const result = await salesService.addSale(itensSold);
  if (result.err) return res.status(422).json(result);
  return res.status(200).json(result);
});

module.exports = {
  createSale,
};
