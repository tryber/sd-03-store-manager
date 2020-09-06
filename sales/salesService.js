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

const arrayIsValid = (itensSold, products) => {
  let isValid = true;
  let stockIsAvailable = true;
  itensSold.forEach(({ quantity }, index) => {
    if (quantity <= 0 || typeof quantity !== 'number') isValid = false;
    if (products[index].quantity < quantity) stockIsAvailable = false;
  });
  return { isValid, stockIsAvailable };
};

module.exports = { addSales, arrayIsValid, getAllSales, getSalesById, updateSales, deleteSales };
