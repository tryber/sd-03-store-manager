const Boom = require('@hapi/boom');
const { Router } = require('express');
const { addSale, arrayIsValid } = require('./salesService');
const { errorHandler } = require('../controllers/errorHandler');

const salesRouter = Router();

const newSale = async (req, res, next) => {
  try {
    if (!arrayIsValid(req.body)) {
      next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    }
    const result = await addSale(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

salesRouter.route('/').post(newSale, errorHandler);

module.exports = salesRouter;
