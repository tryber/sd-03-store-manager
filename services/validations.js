const { getProductByName } = require('../models/produtos');

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

module.exports = { validadeNewProduct, validadeUpdateProduct };
