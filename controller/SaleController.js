const { Router } = require('express');
const resc = require('express-rescue');
const salesService  = require('../services/SalesService');

const sales = Router();


sales.post(
    '/',
    resc(async (req, res) => {
      const products = req.body;
  
      const sale = await salesService.saleCreate(products);
  
      if (sale.err && sale.err.code === 'stock_problem') {
        return res.status(404).json(sale);
      }
  
      if (sale.err) {
        return res.status(422).json(sale);
      }
  
      return res.status(200).json(sale);
    }),
  );

module.exports = sales;