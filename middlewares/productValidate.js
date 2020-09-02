const { body, check, validationResult, param } = require('express-validator');
const {
  INVALID_NAME_LENGTH,
  INVALID_NAME_TYPE,
  INVALID_QUANTITY,
  INVALID_QUANTITY_TYPE,
  INVALID_ID_OR_QUANTITY,
  WRONG_ID,
  errMessage,
} = require('../services/errorsServices');

const productValidate = (schemas) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const errors = result.array();
  return res.status(422).send(errors[0].msg);
};

const productValidationRules = [
  body('name', errMessage('invalid_data', INVALID_NAME_TYPE)).isString(),
  body('name', errMessage('invalid_data', INVALID_NAME_LENGTH)).isLength({ min: 6 }),
  body('quantity', errMessage('invalid_data', INVALID_QUANTITY_TYPE)).isNumeric(),
  check('quantity', errMessage('invalid_data', INVALID_QUANTITY)).custom((value) => value > 0),
];

const idValidationRules = [
  param('id', errMessage('invalid_data', WRONG_ID)).isMongoId(),
];

const addSaleValidationRules = [
  body().isArray(),
  body('*.productId', errMessage('invalid_data', INVALID_ID_OR_QUANTITY)).isMongoId(),
  body('*.quantity', errMessage('invalid_data', INVALID_ID_OR_QUANTITY)).isNumeric(),
  body('*.quantity', errMessage('invalid_data', INVALID_ID_OR_QUANTITY)).custom((value) => value > 0),
];

module.exports = {
  productValidate: productValidate(productValidationRules),
  idValidate: productValidate(idValidationRules),
  saleValidate: productValidate(addSaleValidationRules),
};
