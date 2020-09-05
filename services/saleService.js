const model = require('../model/model');

const createSale = async (products) => {
  const result = await model.createSaletInDB(products);
  return result;
};

module.exports = {
  createSale,
};
