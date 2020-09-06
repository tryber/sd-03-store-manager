const Boom = require('@hapi/boom');
const productsService = require('../products/productsService');

const errorMessages = {
  nameminLength: '"name" length must be at least 5 characters long',
  quantityminimum: '"quantity" must be larger than or equal to 1',
  quantitytype: '"quantity" must be a number',
};

const boomReformat = (error) => errorMessages[`${error.data[0].path}${error.data[0].reason}`];

const errorHandler = (error, _req, res, next) => {
  if (error.code === 11000) {
    return res
      .status(422)
      .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  }
  if (error.isBoom) {
    let code = 'invalid_data';
    if (typeof error.data === 'string') code = error.data;
    return res.status(error.output.statusCode).json({
      err: { code, message: boomReformat(error) || error.output.payload.message },
    });
  }
  next(error);
};

const verifyId = (req, _res, next) => {
  const { id } = req.params;
  const isValid = productsService.validateId(id);
  if (!isValid) return next(Boom.badData('Wrong id format', 'invalid_data'));
  return next();
};

const verifySaleId = (req, _res, next) => {
  const { id } = req.params;
  const isValid = productsService.validateId(id);
  if (!isValid) return next(Boom.badData('Wrong sale ID format', 'invalid_data'));
  return next();
};

module.exports = { errorHandler, verifyId, verifySaleId };
