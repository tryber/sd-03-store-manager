const saleModel = require('../models/saleModel');
const productModel = require('../models/productsModel');
const productsService = require('./productsService');

const regexId = /^[0-9a-fA-F]{24}$/;

const validateSale = async (itensSold) => {
  const quantityCheck = itensSold.some(({ quantity }) => quantity < 1);
  const stringCheck = itensSold.some(({ quantity }) => typeof quantity !== 'number');
  const getPromise = itensSold.map(
    async ({ productId }) => (await productModel.findProductById(productId)) !== null,
  );
  const arr = await Promise.all(getPromise).then((data) => data);
  const idCheck = arr.some((ele) => !ele);

  if (quantityCheck || idCheck || stringCheck) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  const returnedPromise = itensSold.map(async ({ productId, quantity }) => {
    const totalInStock = (await productModel.findProductById(productId)).quantity;
    return quantity > totalInStock;
  });
  const isTrue = await Promise.all(returnedPromise).then((data) => data);
  if (isTrue.some((ele) => ele)) {
    return {
      err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
    };
  }

  return true;
};

const validateParams = (quantity) => {
  let response;
  if (quantity < 1) {
    response = {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  if (quantity === 0) {
    response = {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  if (typeof quantity !== 'number') {
    response = {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  return response;
};

const createSale = async (itensSold) => {
  const sale = await validateSale(itensSold);
  if (sale.err) return sale;
  return saleModel.createSale(itensSold);
};

const findAllSales = async () => saleModel.findAllSale();

const findSaleById = async (id) => {
  const sale = await saleModel.findSaleById(id);
  if (!regexId.test(id)) return { err: 'invalid_data', message: 'Sale not found' };
  return sale;
};

const updateSale = async (id, productId, quantity) => {
  const validQuantity = validateParams(quantity);

  const saleExistForUpdate = await saleModel.findSaleById(id);
  const productIdToUpdate = saleExistForUpdate.itensSold.filter((e) => e.product === productId);
  if (!productIdToUpdate) {
    const validate = validateParams(quantity);
    return validate;
  }

  if (validQuantity) return validQuantity;
  if (!regexId.test(id)) return validSale;

  return saleModel.updateSale(id, productId, quantity);
};

const deleteSale = async (id) => {
  if (!regexId.test(id)) return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  const saleById = await findSaleById(id);
  if (!saleById) return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

  await saleModel.deleteSale(id);
  return saleById;
};

module.exports = { createSale, findAllSales, findSaleById, updateSale, deleteSale };
