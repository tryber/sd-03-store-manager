const { getProductById, getProductByName } = require('../models/productsModel');

async function validateNewProduct(name, quantity) {
  let message = {};
  const product = await getProductByName(name);
  if (product) message = { message: 'Product already exists' };
  if (typeof name !== 'string' || name.length <= 5) message = { message: '"name" length must be at least 5 characters long' };
  if (typeof quantity !== 'number') message = { message: '"quantity" must be a number' };
  if (quantity <= 0) message = { message: '"quantity" must be larger than or equal to 1' };
  return message;
}

async function validateUpdateProduct(name, quantity) {
  if (typeof name !== 'string' || name.length <= 5) return { message: '"name" length must be at least 5 characters long' };
  if (typeof quantity !== 'number') return { message: '"quantity" must be a number' };
  if (quantity <= 0) return { message: '"quantity" must be larger than or equal to 1' };
  return {};
}

async function saleReducer(sale) {
  return sale.reduce(async (acc, { productId, quantity }) => {
    if (!acc) return acc;

    const product = await getProductById(productId);
    if (!product) return false;

    if (typeof quantity !== 'number' || quantity <= 0) return false;

    return acc;
  }, true);
}

async function validateSale(sale) {
  const isvalid = await saleReducer(sale);

  if (isvalid) {
    return {};
  }
  return { message: 'Wrong product ID or invalid quantity' };
}

async function validateStock(sale) {
  console.log('sale', sale);
  const valid = await sale.reduce(async (acc, i) => {
    if (!acc) return acc;
    const product = await getProductById(i.productId);
    const quantity = product ? product.quantity : -1;
    return quantity > i.quantity;
  }, true);
  return valid;
}

module.exports = {
  validateNewProduct,
  validateUpdateProduct,
  validateSale,
  validateStock,
};
