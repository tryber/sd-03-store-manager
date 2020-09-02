const { Router } = require('express');
const rescue = require('express-rescue');
const { addProductValidate } = require('../middlewares/productValidate');
const salesServices = require('../services/salesServices');

const sales = Router();

sales
  .post('/', addProductValidate, rescue(async (req, res) => {
    const products = req.body;
    const salesCreateds = await salesServices.createSales(products);
    return res.status(200).json(salesCreateds);
  }));
// .get('/', rescue(async (_req, res) => {

// }));

module.exports = sales;
