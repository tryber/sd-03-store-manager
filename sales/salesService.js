const salesModel = require('./salesModel');

const addSales = async (itensSold) => {
  const sale = await salesModel.addSale(itensSold);
  return { _id: sale.insertedId, itensSold };
};

const getAllSales = async () => ({ sales: await salesModel.getAllSales() });

const getSalesById = (id) => salesModel.getSalesById(id);

const updateSales = async (id, itensSold) => {
  await salesModel.updateSales(id, itensSold);
  return { _id: id, itensSold };
};

const deleteSales = (id) => salesModel.deleteSales(id);

const arrayIsValid = (itensSold) => {
  let isValid = true;
  itensSold.forEach(({ quantity }) => {
    if (quantity <= 0 || typeof quantity !== 'number') isValid = false;
  });
  return isValid;
};

module.exports = { addSales, arrayIsValid, getAllSales, getSalesById, updateSales, deleteSales };
