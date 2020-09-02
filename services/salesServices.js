const storeModel = require('../model/storeModel');
const { getById } = require('./productServices');
const validateSale = async (soldItems) => {
  const quantityCheck = soldItems.some(({ quantity }) => quantity < 1);
  const stringCheck = soldItems.some(({ quantity }) => typeof (quantity) !== 'number');
  const getPromise = soldItems
    .map(async ({ productId }) => await storeModel.getProductById(productId) !== null);
  const arr = await Promise.all(getPromise).then((data) => data);
  const idCheck = arr.some((e) => !e);

  if (quantityCheck || idCheck || stringCheck) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  const returnedPromise = soldItems.map(async ({ productId, quantity }) => {
    const totalInStock = (await storeModel.getProductById(productId)).quantity;
    return quantity > totalInStock;
  });
  const isTrue = await Promise.all(returnedPromise).then((data) => data);
  if (isTrue.some((e) => e)) {
    return {
      err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
    };
  }

  return true;
};

const validateSalesUpdate = async (soldItems) => {
  const quantityCheck = soldItems.some(({ quantity }) => quantity < 1);
  const stringCheck = soldItems.some(({ quantity }) => typeof (quantity) !== 'number');

  if (quantityCheck || stringCheck) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  return true;
};

const serviceCreateSale = async (soldItems) => {
  const sale = await validateSale(soldItems);
  if (sale.err) return sale;
  storeModel.updateProductAfterSale(soldItems);
  return storeModel.createSale(soldItems);
};

const serviceGetAllSales = async () => storeModel.getAllSales();

const serviceGetSaleById = async (id) => getById(storeModel.getSaleById, id, 'not_found', 'Sale not found');

const serviceUpdateSale = async (id, soldItens) => {
  const sale = await validateSalesUpdate(soldItens);
  if (sale.err) return sale;
  return storeModel.updateSale(id, soldItens);
};

const serviceDeleteSale = async (id) => {
  const sale = await storeModel.getSaleById(id);
  if (!sale) return { err: { code: 'not_found', message: 'Wrong sale ID format' } };
  storeModel.updateProductAfterDeletion(sale);
  await storeModel.deleteSale(id);
  return sale;
};

module.exports = {
  serviceCreateSale,
  serviceGetAllSales,
  serviceGetSaleById,
  serviceUpdateSale,
  serviceDeleteSale,
};
