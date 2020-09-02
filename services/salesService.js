// const salesModel = require('../models/salesModel');
// // const sales = require('../controllers/salesController');

// const validateSaleData = ({ itensSold: { productId, quantity } }) => {
//   if (!productId) return { error: true, code: 'invalid_data', message: 'Produto inválido' };
//   if (quantity <= 0) return {
//     error: true, code: 'invalid_data', message: 'Quantidade deve ser maior que 0'
//   };
//   return { error: false };
// };

// const getAllSales = async () => salesModel.getAllSales();

// const createSale = async ({ itensSold: { productId, quantity } }) => {
//   const validation = validateSaleData({ itensSold: { productId, quantity } });

//   if (validation.error) return validation;

//   const sale = await salesModel.createSale({ itensSold: { productId, quantity } });

//   return sale;
// };

// const getSaleById = async (id) => {
//   const sale = await salesModel.getSaleById(id);

//   if (!sale) throw new Error(`sale with id ${id} was not found`);

//   return sale;
// };

// const deleteSale = async (id) => {
//   await salesModel.deleteSale(id);
// };

// const updateSale = async (id, { itensSold: { productId, quantity } }) => {
//   const validation = validateSaleData({ itensSold: { productId, quantity } });
//   if (validation.error) return validation;

//   const sale = await getSaleById(id);

//   if (sale.error) return sale;

//   return salesModel.updateSale(id, { itensSold: { productId, quantity } });
// };

// module.exports = {
//   getAllSales,
//   createSale,
//   getSaleById,
//   deleteSale,
//   updateSale,
// };
