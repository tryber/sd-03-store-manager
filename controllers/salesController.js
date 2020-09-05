const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const insertSales = rescue(async (req, res, next) => {
  const sales = await salesService.insertSales(req.body);
  if (sales.error) {
    return next(sales);
  }
  res.status(200).json(sales);
});

module.exports = {
  insertSales,
};
