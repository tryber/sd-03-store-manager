const { body, validationResult } = require('express-validator');

const productValidate = (schemas) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array();
  return res.send(errors);
};
const productValidationRules = [
  body('name', 'O nome precisa ser uma string').isString(),
  body('name', 'O nome precisa ser uma string').isLength({ min: 6 }),
  body('quantity', 'A quantidade deve ser numérica').isNumeric(),
  body('quantity', 'A quantidade deve ser maior ou igual a 1').isLength({ min: 1 }),
];

module.exports = {
  productValidate: productValidate(productValidationRules),
};
