const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const { schema, ERRORSmessage, ERRORScode, ValidarDados, VerIdsInex } = require('./validator');

const registerSale = async (arrProd) => {
  // Checa se os produtos que recebo aqui estão préviamente cadastrados
  const products = await productModel.getAllProductsIds();
  // Faz uma conversão de ObjectId do mongo para String para posterior comparação.
  const newProds = products.map(({ _id }) => _id.toString());
  const result = VerIdsInex(newProds, arrProd);
};

module.exports = {
  registerSale,
};
