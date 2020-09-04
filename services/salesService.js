const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const { VerQtdVen, VerCadProd } = require('./validator');

const registerSale = async (arrProd) => {
  /*  Checa se os produtos que recebo aqui estão préviamente cadastrados e
  faz uma conversão de ObjectId do mongo para String para posterior comparação. */
  const products = await productModel.getAllProductsIds();
  const cadProds = products.map(({ _id }) => _id.toString());
  const validaProds = VerCadProd(cadProds, arrProd);
  if (validaProds.error) return validaProds;

  // Checagem da quantidade de produtos
  const verQtds = VerQtdVen(arrProd);
  if (verQtds.error) return verQtds;

  // Passando em todos as checagens realiza a venda
  const sold = await salesModel.createSale(arrProd);
  return sold;
};

const listAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return { sales: allSales };
};

const listSaleById = async (id) => {
  const saleById = await salesModel.getSaleById(id);
  return saleById;
};

module.exports = {
  registerSale,
  listAllSales,
  listSaleById,
};
