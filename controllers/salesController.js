const { Router } = require('express');
const rescue = require('express-rescue');

const salesService = require('../services/salesService');

const sales = Router();

sales.post('/', rescue(async (req, res, next) => {
  const arrProd = req.body;

  const sale = await salesService.registerSale(arrProd);

  if (sale.error) return next(sale);

  return res.status(200).json(sale);
}));

sales.get('/', rescue(async (_req, res) => {
  const allSales = await salesService.listAllSales();
  res.status(200).json(allSales);
}));

sales.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const saleById = await salesService.listSaleById(id);

  if (saleById.code === 'not_found') {
    const { code, message } = saleById;
    return res.status(404).json({ err: { code, message } });
  }

  res.status(200).json(saleById);
}));

// sales.put('/:id', rescue(async (req, res) => {
//   const { id } = req.params;
//   const prod = req.body[0];

//   const update = salesService.updateById(id, prod);

// }));

sales.delete('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const deleteById = await salesService.deleteById(id);

  if (deleteById.error) return next(deleteById);

  res.status(200).json(deleteById);
}));

module.exports = {
  sales,
};
