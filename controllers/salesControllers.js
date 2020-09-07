const { Router } = require('express');
const rescue = require('express-rescue');

const saleService = require('../service/saleService');

const sales = Router();

const xablau = 'err';
const StringSale = 'sales';

sales.get('/', rescue(async (_, res) => {
  const sale = await saleService.getAllSales();

  return res.status(200).json({
    [StringSale]: sale,
  });
}));

sales.post('/', rescue(async (req, res) => {
  const itensSold = req.body;

  const sale = await saleService.createSale(itensSold);

  if (sale.error) {
    return res.status(422).json({
      [xablau]: {
        code: 'invalid_data',
        message: sale.message,
      },
    });
  }

  return res.status(200).json(sale);
}));

sales.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const newSale = await saleService.updateSale(id, itensSold);

  if (newSale.error) {
    return res.status(422).json({
      [xablau]: {
        code: 'invalid_data',
        message: newSale.message,
      },
    });
  }

  return res.status(200).json(newSale);
}));

sales.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await saleService.getSaleById(id);

  if (sale.message === 'Sale not found') {
    return res.status(404).json({
      [xablau]: {
        code: 'not_found',
        message: sale.message,
      },
    });
  }

  if (sale.error) {
    return res.status(422).json({
      [xablau]: {
        code: 'invalid_data',
        message: sale.message,
      },
    });
  }

  return res.status(200).json(sale);
}));

sales.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const deletedSale = await saleService.deleteSale(id);

  if (deletedSale.error) {
    return res.status(422).json({
      [xablau]: {
        code: 'invalid_data',
        message: deletedSale.message,
      },
    });
  }

  return res.status(200).json(deletedSale);
}));

module.exports = sales;
