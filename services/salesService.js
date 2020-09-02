const salesModel = require('../models/salesModel');
// const sales = require('../controllers/salesController');

const validateSaleData = (name, quantity) => {
  if (!name || name.length < 5) return { error: true, code: 'invalid_data', message: 'Nome inválido' };
  if (quantity <= 0) return { error: true, code: 'invalid_data', message: 'Idade deve ser maior que 0' };
  return { error: false };
};

const getAllSales = async () => salesModel.getAllSales();

const createSale = async (name, quantity) => {
  const validation = validateSaleData(name, quantity);

  if (validation.error) return validation;

  const sale = await salesModel.createSale(name, quantity);

  return sale;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale) throw new Error(`sale with id ${id} was not found`);

  return sale;
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
};

const updateSale = async (id, { name, quantity }) => {
  const validation = validateSaleData(name, quantity);
  if (validation.error) return validation;

  const sale = await getSaleById(id);

  if (sale.error) return sale;

  return salesModel.updateSale(id, { name, quantity });
};

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
  deleteSale,
  updateSale,
};
