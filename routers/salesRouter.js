const { Router } = require('express');
const rescue = require('express-rescue');

const { salesController } = require('../controllers');

const sales = Router();

sales.get('/', rescue(salesController.getAllSales));

module.exports = sales;
