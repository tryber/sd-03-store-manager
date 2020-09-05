const sales = require('../models/sales');
const { invaliddataError } = require('../errors');

const checkForHexRegExp = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const insertSales = async (saleInsert) => {
  const checkId = saleInsert.map((el) => !checkForHexRegExp(el.productId));
  const checkNumber = saleInsert.map((el) => el.quantity <= 0);
  if (checkId.some((el) => el === true) || checkNumber.some((el) => el === true)) {
    return invaliddataError('Wrong product ID or invalid quantity');
  }
  const t = await sales.insertSales(saleInsert);
  return t;
};

module.exports = {
  insertSales,
};
