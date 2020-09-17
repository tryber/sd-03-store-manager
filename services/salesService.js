const { salesModel, productsModel } = require('../models');
const { isValid } = require('../utils');

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  if (id.length < 24) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  const saleId = await salesModel.getSaleById(id);

  if (!saleId) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return saleId;
};

const createSale = async (sales) => {
  const sale = await isValid.saleValidation(sales);

  if (sale.err) return sale;

  await Promise.all(sales.map(async ({ productId, quantity }) => {
    const product = await productsModel.getProductById(productId);
    const newStock = product[0].quantity - quantity;
    await productsModel.updateProduct(productId, product.name, newStock);
  }));

  return salesModel.createSale(sales);
};

const updateSale = async (id, itensSale) => {
  const itensSaleValidation = await isValid.saleValidation(itensSale);

  if (itensSaleValidation.err) return itensSaleValidation;

  return salesModel.updateSale(id, itensSale);
};

const deleteSale = async (id) => {
  const found = await salesModel.getSaleById(id);
  if (id.length < 24) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }

  await Promise.all(found.itensSold.map(async ({ productId, quantity }) => {
    const product = await productsModel.getProductById(productId);
    const newStock = product[0].quantity + quantity;
    await productsModel.updateProduct(productId, product.name, newStock);
  }));

  await salesModel.deleteSale(id);
};

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
  updateSale,
  deleteSale,
};
