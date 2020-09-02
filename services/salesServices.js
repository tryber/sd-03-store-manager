const { createSales, getAllSales } = require('../models/salesModel');
const { salesRegistryValidation } = require('./validation');

/* valida se alguma mensage de erro de validação é
    retornada, caso sim inclui numa array de mensagens,
    é necessário tratar os erros para garantir que aplicação
    não quebre */
const productsValidation = async (products = []) =>
  products.reduce(async (acc, { productId, quantity }) => {
    if (Promise.reject) throw new Error('Wrong product ID or invalid quantity');
    return salesRegistryValidation(productId, quantity)
      ? [...acc, salesRegistryValidation(productId, quantity)]
      : acc;
  }, []);

const createSale = async (products = []) => {
  try {
    const reqValidation = await productsValidation(products);
    const newSale = !reqValidation.length && (await createSales(products));
    return productsValidation || { ...newSale };
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

module.exports = { createSale, listSales };
