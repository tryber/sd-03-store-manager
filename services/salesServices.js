const { createSales, getAllSales } = require('../models/salesModel');
const { salesRegistryValidation } = require('./validation');

const createSale = async (products = []) => {
  try {
    /* valida se alguma mensage de erro de validação é
    retornada, caso sim inclui numa array de mensagens */
    const productsValidation = products.reduce(
      (acc, { productId, quantity }) =>
        (salesRegistryValidation(productId, quantity)
          ? [...acc, salesRegistryValidation(productId, quantity)]
          : acc),
      [],
    );
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
