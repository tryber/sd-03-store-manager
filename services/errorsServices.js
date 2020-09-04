const INVALID_NAME_LENGTH = '"name" length must be at least 5 characters long';
const INVALID_NAME_TYPE = 'O nome precisa ser uma string';
const INVALID_QUANTITY = '"quantity" must be larger than or equal to 1';
const INVALID_QUANTITY_TYPE = '"quantity" must be a number';
const PRODUCT_ALREADY_EXISTS = 'Product already exists';
const WRONG_ID = 'Wrong id format';
const UNKNOW_PRODUCT = 'Unknow product ID';
const INVALID_ID_OR_QUANTITY = 'Wrong product ID or invalid quantity';
const WRONG_SALE_ID = 'Wrong sale ID format';
const SALE_NOT_FOUND = 'Sale not found';
const STOCK_ERROR_QUANTITY = 'Such amount is not permitted to sell';

const errMessage = (code, message) => ({
  err: {
    code,
    message,
  },
});

module.exports = {
  INVALID_NAME_LENGTH,
  INVALID_NAME_TYPE,
  INVALID_QUANTITY,
  INVALID_QUANTITY_TYPE,
  PRODUCT_ALREADY_EXISTS,
  WRONG_ID,
  UNKNOW_PRODUCT,
  INVALID_ID_OR_QUANTITY,
  WRONG_SALE_ID,
  SALE_NOT_FOUND,
  STOCK_ERROR_QUANTITY,
  errMessage,
};
