const salesModel = require('./salesModel');

const addSale = async (itensSold) => {
  const sale = await salesModel.addSale(itensSold);
  return { _id: sale.insertedId, itensSold };
};

const arrayIsValid = (itensSold) => {
  let isValid = true;
  itensSold.forEach(({ quantity }) => {
    if (quantity <= 0 || typeof quantity !== 'number') isValid = false;
  });
  return isValid;
};

module.exports = { addSale, arrayIsValid };
