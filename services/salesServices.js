const { createSales, getAllSales } = require('../models/salesModel');
const { salesRegistryValidation } = require('./validation');

const createSale = async (products = []) => {
  try {
    /* valida se alguma mensage de erro de validação é
    retornada, caso sim inclui numa array de mensagens,
    é necessário tratar os erros para garantir que aplicação
    não quebre */
    const productsValidation = products.reduce(async (acc, { productId, quantity }) => {
      try {
        if (Promise.reject) throw new Error('Wrong product ID or invalid quantity');
        return !Promise.reject && salesRegistryValidation(productId, quantity)
          ? [...acc, salesRegistryValidation(productId, quantity)]
          : acc;
      } catch (error) {
        throw new Error(error.message);
      }
    }, Promise.resolve([]));
    const newSale = !productsValidation.length && createSales(products);

    return productsValidation || { ...newSale };
  } catch (error) {
    throw new Error(error.message);
  }
};

const listSales = async () => {
  try {
    const sales = await getAllSales();
    return [...sales];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createSale, listSales };
