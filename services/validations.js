const { getProductById, getProductByName } = require('../models/produtos');

/**
 *
 * @param {String} name
 * @param {Number} quantity
 */
async function validadeNewProduct(name, quantity) {
  const product = await getProductByName(name);
  if (product) return { message: 'Product already exists' };
  if (typeof name !== 'string' || name.length <= 5) return { message: '"name" length must be at least 5 characters long' };
  if (typeof quantity !== 'number') return { message: '"quantity" must be a number' };
  if (quantity <= 0) return { message: '"quantity" must be larger than or equal to 1' };
  return {};
}

async function validadeUpdateProduct(name, quantity) {
  // const product = await getProductByName(name);
  // if (product) return { message: 'Product already exists' };
  if (typeof name !== 'string' || name.length <= 5) return { message: '"name" length must be at least 5 characters long' };
  if (typeof quantity !== 'number') return { message: '"quantity" must be a number' };
  if (quantity <= 0) return { message: '"quantity" must be larger than or equal to 1' };
  return {};
}

async function validadeSale(sale) {
  const isvalid = await sale.reduce(async (acc, { productId, quantity }) => {
    if (!acc) return acc;

    const product = await getProductById(productId);
    if (!product) return false;

    if (typeof quantity !== 'number' || quantity <= 0) return false;

    return acc;
  }, true);

  if (isvalid) {
    return {};
  }
  return { message: 'Wrong product ID or invalid quantity' };
}

module.exports = { validadeNewProduct, validadeUpdateProduct, validadeSale };
