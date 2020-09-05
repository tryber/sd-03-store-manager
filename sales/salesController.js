const Boom = require('@hapi/boom');
const { Router } = require('express');
const { addSale, arrayIsValid, getAllSales, getSalesById, update } = require('./salesService');
const { errorHandler, verifyId } = require('../controllers/errorHandler');

const salesRouter = Router();

const listSales = async (_req, res) => {
  const sales = await getAllSales();
  res.status(200).json(sales);
};

const newSale = async (req, res, next) => {
  try {
    if (!arrayIsValid(req.body)) {
      next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    } else {
      const result = await addSale(req.body);
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    if (!arrayIsValid(req.body)) {
      next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    } else {
      const { id } = req.params;
      const result = await update(id, req.body);
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

salesRouter.route('/').get(listSales).post(newSale, errorHandler);

salesRouter.route('/:id').get(verifyId, getSalesById).put(verifyId, updateSale, errorHandler);

module.exports = salesRouter;
