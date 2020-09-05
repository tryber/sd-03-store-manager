const sales = require('../models/sales');
const { invaliddataError } = require('../errors');

const checkForHexRegExp = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const insertSales = async (saleInsert) => {
  const checkId = saleInsert.map((el) => !checkForHexRegExp(el.productId));
  const checkNumber = saleInsert.map((el) => el.quantity);
  const checkNumberTwo = (el) => /^[0-9]+$/.test(el);
  if (checkId.some((el) => el === true) || checkNumber.some((el) => el <= 0)
  || checkNumber.some((el) => !checkNumberTwo(el))) {
    return invaliddataError('Wrong product ID or invalid quantity');
  }
  const t = await sales.insertSales(saleInsert);
  return t;
};

module.exports = {
  insertSales,
};
