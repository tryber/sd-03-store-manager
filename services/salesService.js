const salesModel = require('../models/salesModel');

const add = async (sale) => {
  const answer = sale.reduce((acc, { productId, quantity }) => {
    if (productId.length < 24 || quantity <= 0 || typeof quantity !== 'number') {
      acc.push('error');
    }
    return acc;
  }, []);

  if (answer.length !== 0) {
    return ({ error: true, message: 'Wrong product ID or invalid quantity' });
  }

  const result = await salesModel.add(sale);
  return result;
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return ({ sales: result });
};

const getById = async (id) => {
  const errorMessage = { error: true, message: 'Wrong id format' };

  if (id.length < 24) {
    return errorMessage;
  }

  const result = await salesModel.getSaleById(id);

  if (!result) {
    return errorMessage;
  }

  return result;
};

const updateSale = async ({ id, products }) => {
  const answer = products.reduce((acc, { productId, quantity }) => {
    if (productId.length < 24 || quantity <= 0 || typeof quantity !== 'number') {
      acc.push('error');
    }
    return acc;
  }, []);

  if (answer.length !== 0) {
    return ({ error: true, message: 'Wrong product ID or invalid quantity' });
  }

  const result = await salesModel.update(id, products);
  return result;
};

const deleteSale = async (id) => {
  const errorMessage = { error: true, message: 'Wrong sale ID format' };

  if (id.length < 24) {
    return errorMessage;
  }

  const sale = await salesModel.getSaleById(id);

  if (!sale) {
    return errorMessage;
  }

  await salesModel.deleteById(id);
  return sale;
};

module.exports = {
  add,
  getAll,
  getById,
  updateSale,
  deleteSale,
};
