const {
  registerSales,
  getSales,
  getSalesById,
  updateSalesInBank,
  deleteSaleBank,
} = require('../models/sales');

const { validateParams, validateId } = require('./libValidation');

const registeringSales = async (products) => {
  const result = await registerSales(products);
  return result;
};

const listSales = async () => {
  const allSales = await getSales();
  return allSales;
};

const listSalesById = async (id) => {
  const salesById = await getSalesById(id);
  return salesById;
};

const validateUpdate = (id, quantity) => {
  if (validateId(id)) {
    return {
      err: { message: 'id invalid', code: 'invalid_data' },
    };
  }
  if (validateParams(quantity)) {
    return {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  if (typeof id === 'string') return id;
};

const updateSales = async (id, products) => {
  let dataValid;
  // let dataUndefined;
  products.map((e) => validateUpdate(e.productId, e.quantity)).forEach((e) => {
    if (e !== 'undefined') dataValid = e;
    return null;
  });
  if (dataValid) return dataValid;
  const result = await updateSalesInBank(id, products);
  return result;
};

const deleteSales = async (id) => {
//  await deleteSaleBank(id);
};

module.exports = {
  registeringSales,
  listSales,
  listSalesById,
  updateSales,
  deleteSales,
};
