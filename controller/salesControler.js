const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const saleService = require('../service/saleService');

const insertSale = rescue(async (req, res) => {
  const insertedSales = await saleService.checkSales(req.body);

  if(insertedSales.error) { return res.status(422).json({ message: insertedSales.message }) }
  return res.status(201).json(insertedSales);
});

module.exports = { insertSale };
