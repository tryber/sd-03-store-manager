const rescue = require('express-rescue');
const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');

const addSale = rescue(async (req, res) => {
  const sales = req.body;

  const newSale = await salesService.add(sales);
  
  if (newSale.code) {
    return res.status(422).json({ 'err': newSale })
  }
  
  
  return res.status(200).json(newSale);
});

const listSales = rescue(async (_req, res) => {
  const list = await salesModel.listAll();
  return res.status(200).json(list);
});

const findSaleById = rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.listById(id);

  if(sale && sale.code === 'invalid_data') return res.status(422).json( { 'err': sale });
  if(sale && sale.code === 'not_found') return res.status(404).json( { 'err': sale });

  return res.status(200).json(sale);
});

const updateSaleById = rescue(async (req, res) => {
  const list = req.body;
  const { id } = req.params;

  const newSale = await salesService.updateSale(id, list);
  
  if (newSale.code) {
    return res.status(422).json({ 'err': newSale })
  }

  return res.status(200).json(newSale);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await salesService.deleteById(id);
  
  if (result) {
    return res.status(422).json({ 'err': result })
  }

  return res.status(200).end();
});

module.exports = {
  addSale,
  listSales,
  findSaleById,
  updateSaleById,
  deleteSale
};