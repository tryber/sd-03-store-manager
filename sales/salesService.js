const salesModel = require('./salesModel');

const addSale = async (itensSold) => {
  const sale = await salesModel.addSale(itensSold);
  return { _id: sale.insertedId, itensSold };
};

const getAllSales = async () => ({ sales: await salesModel.getAllSales() });

const getSalesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesModel.getSalesById(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (id, itensSold) => {
  await salesModel.updateSales(id, itensSold);
  return { _id: id, itensSold };
};

const arrayIsValid = (itensSold) => {
  let isValid = true;
  itensSold.forEach(({ quantity }) => {
    if (quantity <= 0 || typeof quantity !== 'number') isValid = false;
  });
  return isValid;
};

module.exports = { addSale, arrayIsValid, getAllSales, getSalesById, update };
