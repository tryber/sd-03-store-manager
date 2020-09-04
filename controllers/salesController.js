const { Router } = require('express');
const rescue = require('express-rescue');

const salesService = require('../services/salesService');

const sales = Router();

sales.post('/', rescue(async (req, res, next) => {
  const arrProd = req.body;

  const sales = await salesService.registerSale(arrProd);
}));

module.exports = {
  sales,
};
