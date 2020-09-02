const productService = require('./products');
const salesServices = require('./sales');

function verifyId(id) {
  if (!id || id.length !== 24) {
    return { error: true, message: 'Wrong Id format' };
  }
  return true;
}

module.exports = {
  productService,
  salesServices,
  verifyId,
};
