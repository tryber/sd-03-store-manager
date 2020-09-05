const { Router } = require('express');
const salesController = require('../controllers/salesController');

const sales = Router();

sales.post('/', salesController.insertSales);

module.exports = sales;
