const errMessage = (code, message) => ({
  err: {
    code,
    message,
  },
});

const INVALID_NAME_LENGTH = '"name" length must be at least 5 characters long';
const INVALID_NAME_TYPE = 'O nome precisa ser uma string';
const INVALID_QUANTITY = '"quantity" must be larger than or equal to 1';
const INVALID_QUANTITY_TYPE = '"quantity" must be a number';
const PRODUCT_ALREADY_EXISTS = 'Product already exists';
const WRONG_ID = 'Wrong id format';
const UNKNOW_PRODUCT = 'Unknow product ID';

module.exports = {
  INVALID_NAME_LENGTH,
  INVALID_NAME_TYPE,
  INVALID_QUANTITY,
  INVALID_QUANTITY_TYPE,
  PRODUCT_ALREADY_EXISTS,
  WRONG_ID,
  UNKNOW_PRODUCT,
  errMessage,
};
