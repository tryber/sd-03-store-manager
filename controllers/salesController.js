const { Router } = require('express');
const rescue = require('express-rescue');
const { saleValidate, idSaleValidate } = require('../middlewares/productValidate');
const salesServices = require('../services/salesServices');

const sales = Router();

sales
  .post('/', saleValidate, rescue(async (req, res) => {
    const products = req.body;
    const salesCreateds = await salesServices.createSales(products);
    if (salesCreateds.error) {
      return res.status(404).json(salesCreateds.message);
    }
    return res.status(200).json(salesCreateds);
  }))
  .get('/:id', idSaleValidate, rescue(async (req, res) => {
    const { id } = req.params;
    const saleById = await salesServices.getSaleById(id);
    if (saleById.error) {
      return res.status(404).json(saleById.message);
    }
    return res.status(200).json(saleById);
  }))
  .get('/', rescue(async (req, res) => {
    const allSales = await salesServices.getAllSales();
    return res.status(200).json({ sales: allSales });
  }))
  .put('/:id', idSaleValidate, saleValidate, rescue(async (req, res) => {
    const saleData = req.body;
    const { id } = req.params;
    const updatedSale = await salesServices.updateSale(id, saleData[0]);
    res.status(200).json(updatedSale);
  }))
  .delete('/:id', idSaleValidate, rescue(async (req, res) => {
    const { id } = req.params;
    const deletedSale = await salesServices.deleteSaleById(id);
    if (deletedSale.error) {
      return res.status(422).json(deletedSale.message);
    }
    return res.status(200).json(deletedSale);
  }));

module.exports = sales;
