const productValidation = require('./productValidation');
const saleValidation = require('./saleValidation');

module.exports = {
  productValidation,
  isValid: saleValidation,
};
