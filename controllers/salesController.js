const { Router } = require('express');
const rescue = require('express-rescue');
const { saleValidate, idValidate } = require('../middlewares/productValidate');
const salesServices = require('../services/salesServices');

const sales = Router();

sales
  .post('/', saleValidate, rescue(async (req, res) => {
    const products = req.body;
    const salesCreateds = await salesServices.createSales(products);
    return res.status(200).json(salesCreateds);
  }))
  .get('/:id', idValidate, rescue(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const saleById = await salesServices.getSaleById(id);
    return res.status(200).json(saleById);
  }))
  .get('/', rescue(async (req, res) => {
    const allSales = await salesServices.getAllSales();
    return res.status(200).json({ sales: allSales });
  }))
  .put('/:id', idValidate, saleValidate, rescue(async (req, res) => {
    const saleData = req.body;
    const { id } = req.params;
    console.log('antigo', req.body[0]);
    const updatedSale = await salesServices.updateSale(id, saleData[0]);
    console.log('novo', updatedSale);
    res.status(200).json(updatedSale);
  }));

module.exports = sales;
