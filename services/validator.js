const Joi = require('joi');

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

// Verifica se existem Ids Inexistentes sendo vendidos
const VerIdsInex = (IdsCad, IdsEnv) => IdsEnv.every(({ productId }) => IdsCad.includes(productId));

module.exports = {
  schema,
  ERRORSmessage,
  ERRORScode,
  ValidarDados,
  VerIdsInex,
};

// idsCadastrados [
//   5f5261bf97c4383db4210b65,
//   5f5261c697c4383db4210b66,
//   5f5261cb97c4383db4210b67,
//   5f5261d097c4383db4210b68,
//   5f5261d897c4383db4210b69,
//   5f5261e997c4383db4210b6a
// ]