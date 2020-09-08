const sales = require('../models/sales');
const products = require('../models/products');
const { invaliddataError, notFound, stockProblem } = require('../errors');

const checkForHexRegExp = (id) => /^[0-9a-fA-F]{24}$/.test(id);
const checkNumberTwo = (el) => /^[0-9]+$/.test(el);

const deleteSales = async (id) => {
  if (!checkForHexRegExp(id)) {
    return invaliddataError('Wrong sale ID format');
  }
  const sale = await sales.getSalesById(id);
  if (!sale) {
    return notFound('Sale not found');
  }
  Promise.all(
    await sale.itensSold.map((el) => products.getProductById(el.productId)),
  ).then((e) => e.map((el, index) => products
    .updateProduct(sale.itensSold[index].productId,
      el.name, el.quantity + sale.itensSold[index].quantity)));
  await sales.deleteSales(id);
  return sale;
};

const insertSales = async (saleInsert) => {
  const checkId = saleInsert.map((el) => !checkForHexRegExp(el.productId));
  const checkNumber = saleInsert.map((el) => el.quantity);
  if (checkId.some((el) => el === true) || checkNumber.some((el) => el <= 0)
  || checkNumber.some((el) => !checkNumberTwo(el))) {
    return invaliddataError('Wrong product ID or invalid quantity');
  }
  Promise.all(await saleInsert.map((el) => products.getProductById(el.productId)))
    .then((e) => {
      for (let i = 0; i <= e.length - 1; i += 1) {
        if (e[i].quantity - saleInsert[i].quantity <= 0) {
          this.f = true;
        }
      }
    });
  Promise.all(
    await saleInsert.map((el) => products.getProductById(el.productId)),
  ).then((e) => e.map((el, index) => products
    .updateProduct(saleInsert[index].productId,
      el.name, el.quantity - saleInsert[index].quantity)));
  const t = await sales.insertSales(saleInsert);
  if (this.f) {
    await deleteSales(Object.values(t)[0]);
    return stockProblem('Such amount is not permitted to sell');
  }
  return t;
};

const getAllSales = async () => {
  const allSales = await sales.getAllSales();
  return allSales;
};

const getSalesById = async (id) => {
  const allSales = await sales.getSalesById(id);
  if (!allSales) {
    return notFound('Sale not found');
  }
  return allSales;
};

const updateSales = async (id, values) => {
  const trueValues = values.map((el) => el.quantity);
  if (trueValues.some((el) => el <= 0)
  || trueValues.some((el) => !checkNumberTwo(el))) {
    return invaliddataError('Wrong product ID or invalid quantity');
  }
  const allSales = await sales.updateSales(id, values);
  return allSales;
};

module.exports = {
  insertSales,
  getAllSales,
  getSalesById,
  updateSales,
  deleteSales,
};
