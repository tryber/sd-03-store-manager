const salesModel = require('../model/salesModel');
const productModel = require('../model/productModel');

const genericError = { err: {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
} };

const validateSaleData = async (items) => {
  const isValid = true;
  const takeOnThePromise = items.map(async (productId) => {
    await productModel.selectById(productId);
  });
  const products = await Promise.all(takeOnThePromise).then((output) => output);
  console.log(products);
  // if (quantity > 1 && product.length) { isValid = true; }
  return isValid;
}

// const checkSales = async (saleItems) => {
//   let hasError = false;
//   for (item of saleItems) {
//     const { productId, quantity } = item;
//     const product = await productModel.selectById(productId);
//     if (isNaN(quantity) || quantity < 1 || !product.length) { hasError = true; }
//   }
//   if (hasError === true) { return genericError; }
//   return salesModel.insert({ saleItems });
// };

const addSales = async (itemsSold) => {
  const x = await validateSaleData(itemsSold);
  console.log(x);
  return x ?
  salesModel.insert({ itemsSold }) :
  genericError;
};

const updateSale = async (id, itemsSold) => {
  return itemsSold.some((item) => item.quantity < 1) ?
  genericError :
  salesModel.updateOne(id, { itemsSold });
};

const selectAll = async () => salesModel.listAll();
const selectOne = async (id) => salesModel.listOne(id);
const deleteOne = async (id) => salesModel.erase(id);

module.exports = {
  addSales,
  selectAll,
  selectOne,
  updateSale,
  deleteOne,
};
