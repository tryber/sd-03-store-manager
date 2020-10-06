const {
  registerSales,
  updateSaleById,
  deleteSaleById,
  getAllSales,
  getSaleById,
} = require('../models/salesModel');
const { getProductById, updateProductById } = require('../models/productsModel');
const { salesRegistryValidation } = require('./validation');

const saleDeleteUpdate = async (data) => {
  const { itensSold } = data;
  const itensSoldData = await itensSold.map(async (item) => getProductById(item.productId));
  const itensSoldQuantity = await itensSold.map((item) => item.quantity);
  await itensSoldData.map(async (item, index) => {
    const { _id: itemId, name, quantity } = await item;
    const quantUpdate = await (quantity + itensSoldQuantity[index]);
    await updateProductById(itemId, name, quantUpdate);
  });
  return null;
};

const updaterOnSale = async (id) => {
  try {
    const getSale = await getSaleById(id);
    if (!getSale) throw new Error();
    await saleDeleteUpdate(getSale);
    const data = deleteSaleById(id);
    return data;
  } catch (error) {
    throw new Error('Sale not found');
  }
};

const productsValidation = async (products = []) =>
  products.reduce(async (acc, { productId, quantity }) => {
    const validationfailed = await salesRegistryValidation(productId, quantity);
    if (validationfailed) throw new Error(validationfailed.message || 'Wrong product ID or invalid quantity');
    return acc;
  }, []);

const createSale = async (products = []) => {
  try {
    const reqValidation = await productsValidation(products);
    const newSale = reqValidation.length === 0 && (await registerSales(products));
    return { ...newSale };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSaleQuantity = async (id, sale = []) => {
  try {
    const validation = await productsValidation(sale);
    const updateSale = validation.length === 0 && (await updateSaleById(id, sale));
    return { ...updateSale };
  } catch (error) {
    throw new Error(error.message);
  }
};

const readOrDeleteSaleById = async (id, operation = 'read') => {
  try {
    const func = (callback) => callback(id);
    const data = async () =>
  (operation === 'delete' ? func(updaterOnSale) : func(getSaleById));
    const callbackReturn = await data();
    return callbackReturn;
  } catch (error) {
    const message = operation === 'delete' ? 'Wrong sale ID format' : error.message;
    throw new Error(message);
  }
};

const listSales = async () => {
  try {
    const sales = await getAllSales();
    const salesInfo = [...sales];
    return salesInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createSale, listSales, updateSaleQuantity, readOrDeleteSaleById };
