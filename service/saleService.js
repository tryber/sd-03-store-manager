const salesModel = require('../model/salesModel');
const productModel = require('../model/productModel');

const genericError = { err: {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
}};

const checkSales = async (itensSold) => {
  let hasError = false;
  for (item of itensSold) {
    const { productId, quantity } = item;
    const product = await productModel.selectById(productId);
    if (isNaN(quantity) || quantity < 1 || !product.length) { hasError = true };
  }
  if (hasError === true) { return genericError };
  return salesModel.insert({itensSold});
};

const upsertSale = async (id, saleItem) => {
  if (saleItem.quantity > 1) { return salesModel.updateOne(id, saleItem) }
  return genericError;
}

const selectAll = async () => salesModel.listAll();
const selectOne = async (id) => salesModel.listOne(id);
const deleteOne = async (id) => salesModel.erase(id);

module.exports = {
  checkSales,
  selectAll,
  selectOne,
  upsertSale,
  deleteOne,
};
