const productModel = require('../models/productModel');
const { schema, ERRORSmessage, ERRORScode, ValidarDados } = require('./validator');

const registerProduct = async (name, quantity) => {
  /*  Criar as validações de regra de negócio aqui e enviar a requisição para o MongoDB */
  /*  Validação de dados */
  const dataValidated = await ValidarDados(name, quantity);
  if (dataValidated.error) return dataValidated;

  // Verificar unicidade
  const foundProduct = await productModel.getProductByEq(dataValidated.name);
  if (foundProduct) {
    return { error: true, message: ERRORSmessage[2].message, code: ERRORScode.code1 };
  }

  // Passando nas regras de negócio executar:
  const product = await productModel.createProduct(dataValidated.name, dataValidated.quantity);
  return product;
};

const findAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return { products: [...products] };
};

const findProductById = async (id) => {
  // Validação de id
  const { error, value } = schema.validate({ id });

  if (error) {
    return { err: { error: true, code: ERRORScode.code1, message: ERRORSmessage[3].message } };
  }

  const product = await productModel.getProductById(value.id);

  return product;
};

const updateProductById = async (id, name, quantity) => {
  /*  Criar as validações de regra de negócio aqui e enviar a requisição para o MongoDB */
  /*  Validação de dados */
  const dataValidated = await ValidarDados(name, quantity);
  if (dataValidated.error) return dataValidated;

  // Atualização do produto
  const { _id } = await productModel.getProductById(id);
  const u = await productModel.updateProductById(_id, dataValidated);

  return u;
};

const deleteProductById = async (id) => {
  const { error, value } = schema.validate({ id });

  if (error) return { error: true, code: ERRORScode.code1, message: ERRORSmessage[3].message };

  const product = await productModel.deleteProductById(value.id);
  return product;
};

module.exports = {
  registerProduct,
  findAllProducts,
  findProductById,
  updateProductById,
  deleteProductById,
};
