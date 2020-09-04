const {
  createSales,
  updateSalesById,
  deleteSaleById,
  getAllSales,
  getSaleById,
} = require('../models/salesModel');
const { salesRegistryValidation } = require('./validation');

/* valida se alguma mensage de erro de validação é
    retornada, caso sim retorna um erro padronizado,senão
    retorna um array vazio e o processo de cadastro continua */
const productsValidation = async (products = []) =>
  products.reduce(async (acc, { productId, quantity }) => {
    const validationfailed = await salesRegistryValidation(productId, quantity);
    if (validationfailed) throw new Error(validationfailed.message || 'Wrong product ID or invalid quantity');
    return acc;
  }, []);

const createSale = async (products = []) => {
  try {
    const reqValidation = await productsValidation(products);
    const newSale = reqValidation.length === 0 && (await createSales(products));

    return { ...newSale };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSaleQuantity = async (id, sale = []) => {
  try {
    const reqValidation = await productsValidation(sale);
    const updateSale = reqValidation.length === 0 && (await updateSalesById(id, sale));

    return { ...updateSale };
  } catch (error) {
    throw new Error(error.message);
  }
};

const readOrDeleteSaleById = async (id, operation = 'read') => {
  try {
    const func = (callback) => callback(id);

    const data = async () => (operation === 'delete' ? func(deleteSaleById) : func(getSaleById));

    const callbackReturn = await data();
    return callbackReturn;
  } catch (error) {
    throw new Error(error.message);
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
