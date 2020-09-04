const { getProductByName, insertProduct } = require('../models/productsModel');
const errorCreator = require('../utils/errorCreator.js');

const productNameIsValid = (name) => {
  if (typeof name !== 'string' || name.length <= 5) {
    return errorCreator(
      'Nome inválido', 400, 'invalid_data', 'name length must be at least 5 characters long',
    );
  }
  return true;
};

const productAlredyExists = async (name) => {
  if (await getProductByName(name)) {
    return errorCreator(
      'Produto já existente', 400, 'invalid_data', 'Product alredy exists',
    );
  }
  return true;
};

const productQuantityIsValid = (quantity) => {
  const validation = quantity <= 0;
  if (typeof quantity !== 'number' || validation) {
    return errorCreator(
      'Quantidade inválida', 400, 'invalid_data', 'quantity must be larger than or equal to 1',
    );
  }
  return true;
};

const shouldCreateProduct = async (name, quantity) => {
  const validName = await productNameIsValid(name);
  const productExists = productAlredyExists(name);
  const validQuantity = productQuantityIsValid(quantity);
  if (validName && validQuantity && productExists) {
    const response = await insertProduct(name, quantity);
    return response;
  }

  throw new Error('Erro inesperado em productsService.js line 42');
};

module.exports = {
  productNameIsValid,
  productQuantityIsValid,
  shouldCreateProduct,
};
