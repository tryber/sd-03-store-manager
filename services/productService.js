const Joi = require('joi');

const productModel = require('../models/productModel');

const schema = Joi.object({
  name: Joi.string().min(5),
  quantity: Joi.number().integer().min(1),
  id: Joi.string().min(24),
});

const ERRORSmessage = {
  1: { message: '"quantity" must be larger than or equal to 1' },
  2: { message: 'Product already exists' },
  3: { message: 'Wrong id format' },
};

const ERRORScode = {
  code1: 'invalid_data',
};

const ValidarDados = async (name, quantity) => {
  const { value, error } = schema.validate({ name, quantity });

  if (error && error.details[0].type === 'number.min') {
    return { error: true, message: ERRORSmessage[1].message, code: ERRORScode.code1 };
  }

  if (error) return { error: true, message: error.message, code: ERRORScode.code1 };

  return value;
};

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

module.exports = {
  registerProduct,
  findAllProducts,
  findProductById,
  updateProductById,
};
