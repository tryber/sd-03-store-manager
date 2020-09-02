const { body, check, validationResult } = require('express-validator');

const productValidate = (schemas) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const errors = result.array();
  // console.log('erros', errors[0].msg);
  return res.status(422).send(errors[0].msg);
};

const errMessage = (code, message) => ({
  err: {
    code,
    message,
  },
});

const INVALID_NAME_LENGTH = '"name" length must be at least 5 characteres long';
const INVALID_NAME_TYPE = 'O nome precisa ser uma string';
const INVALID_QUANTITY = '"quantity" must be larger than or equal to 1';
const INVALID_QUANTITY_TYPE = '"quantity" must be a number';

const productValidationRules = [
  body('name', errMessage('invalid_data', INVALID_NAME_TYPE)).isString(),
  body('name', errMessage('invalid_data', INVALID_NAME_LENGTH)),
  body('quantity', errMessage('invalid_data', INVALID_QUANTITY_TYPE)).isNumeric(),
  check('quantity', errMessage('invalid_data', INVALID_QUANTITY)).custom((value) => value > 0),
];

module.exports = {
  productValidate: productValidate(productValidationRules),
};
