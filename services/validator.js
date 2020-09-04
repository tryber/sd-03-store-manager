const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(5),
  quantity: Joi.number().integer().min(1).strict(),
  id: Joi.string().min(24),
});

const ERRORSmessage = {
  1: { message: '"quantity" must be larger than or equal to 1' },
  2: { message: 'Product already exists' },
  3: { message: 'Wrong id format' },
  4: { message: 'Wrong product ID or invalid quantity' },
  5: { message: 'Wrong sale ID format' },
  6: { message: 'Sale not found' },
};

const ERRORScode = {
  code1: 'invalid_data',
  code2: 'not_found',
};

const ValidarDados = async (name, quantity) => {
  const { value, error } = schema.validate({ name, quantity });

  if (error && error.details[0].type === 'number.min') {
    return { error: true, message: ERRORSmessage[1].message, code: ERRORScode.code1 };
  }

  if (error) return { error: true, message: error.message, code: ERRORScode.code1 };

  return value;
};

const VerQtdVen = (arrProds) => {
  const qtdsVenda = arrProds.map(({ quantity }) => quantity);
  const err = [];

  // Checagem em cada posicao qtdDeVenda.
  qtdsVenda.forEach((qtd) => {
    const { error } = schema.validate({ quantity: qtd });
    if (error) err.push(1);
  });

  if (err.length > 0) {
    return { error: true, message: ERRORSmessage[4].message, code: ERRORScode.code1 };
  }

  return false;
};

// Verifica se existem Ids Inexistentes sendo vendidos
const VerIdsInex = (IdsCad, IdsEnv) => IdsEnv.every(({ productId }) => IdsCad.includes(productId));

// Retorna Erro se passar produto inexistente na vendas
const VerCadProd = (arr1, arr2) => {
  const teste = VerIdsInex(arr1, arr2);
  // Teste retorna true ou false
  if (!teste) return { error: true, message: ERRORSmessage[4].message, code: ERRORScode.code1 };
  return teste;
};

const ValidSaleId = (id) => {
  const { value, error } = schema.validate({ id });

  if (error) return { error: true, message: ERRORSmessage[5].message, code: ERRORScode.code1 };

  return value.id;
};

module.exports = {
  schema,
  ERRORSmessage,
  ERRORScode,
  ValidarDados,
  VerCadProd,
  VerQtdVen,
  ValidSaleId,
};
