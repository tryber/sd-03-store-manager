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

module.exports = {
  schema,
  ERRORSmessage,
  ERRORScode,
  ValidarDados,
};
