const salesModel = require('../models/sales');
const productsModel = require('../models/products');

const getAllSales = async () => {
  const list = await salesModel.getAllSales();
  return list;
};

const addSeleIntegration = async (item) => {
  const product = await productsModel.getProductById(item.productId);
  if (item.quantity > product.quantity) {
    return 'false'
  }
  const newAmout = (product.quantity - item.quantity);
  const newproduct = await productsModel.updateProduct(item.productId, product.name, newAmout);
  return newproduct;
}

const middleIntegration = async(itensSold) => {
  return Promise.all(itensSold.map((elem) => {
    return addSeleIntegration(elem);
  }));
}

const validateSale = async (itensSold) => {
  const testQuantity = itensSold.some((elem) => elem.quantity < 1);
  if (testQuantity) {
    return {
      error: true,
      message: 'Wrong product ID or invalid quantity',
    };
  }
  const testQuantityNumber = itensSold.some((elem) => typeof elem.quantity !== 'number');
  if (testQuantityNumber) {
    return {
      error: true,
      message: 'Wrong product ID or invalid quantity',
    };
  }
  return { error: false };
};

const createSale = async (itensSold) => {
  const validation = await validateSale(itensSold);

  if (validation.error) return validation;

  const changeProduct = await middleIntegration(itensSold);
  if (changeProduct.some((elem) => elem === 'false')) {
    return {
      error: true,
      message: 'Such amount is not permitted to sell',
    }
  }

  return salesModel.createSale(itensSold);
};

const updateSale = async (id, itensSold) => {
  const validation = await validateSale(itensSold);

  if (validation.error) return validation;

  return salesModel.updateSale(id, itensSold);
};

const getSaleById = async (id) => {
  let sale = null;

  if (id.length !== 24) {
    return {
      error: true,
      message: 'Wrong sale ID format',
    };
  }

  sale = await salesModel.getSaleById(id);

  if (sale === null) {
    return {
      error: true,
      message: 'Sale not found',
    };
  }

  return sale;
};

const subtractSeleIntegration = async (item) => {
  const product = await productsModel.getProductById(item.productId);
  const newAmout = (product.quantity + item.quantity);
  const newproduct = await productsModel.updateProduct(item.productId, product.name, newAmout);
  return newproduct;
}

const subMiddleIntegration = async(itemId) => {
  return Promise.all(itemId.itensSold.map((elem) => {
    return subtractSeleIntegration(elem);
  }));
}

const deleteSale = async (id) => {
  const testId = await getSaleById(id);

  if (testId.error) return testId;

  await subMiddleIntegration(testId);

  return salesModel.deleteSale(id);
};

module.exports = {
  getAllSales,
  createSale,
  updateSale,
  getSaleById,
  deleteSale,
};
