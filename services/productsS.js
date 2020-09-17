// SERVICE: Valida as regras de negócio enviando apenas os dados necessários para o model!
const templates = {
  ok: { status: 201, err: { code: '', message: '' } },
  nameLength: { status: 422, err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } },
  duplicate: { status: 422, err: { code: 'invalid_data', message: 'Product already exists' } },
  quantityNL: { status: 422, err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } },
  quantityN: { status: 422, err: { code: 'invalid_data', message: '"quantity" must be a number' } },
};

function validadeProduct(name, quantity, duplicate) {
  switch (true) {
    case (!name || typeof name !== 'string' || name.length < 5):
      return templates.nameLength;
    case (!quantity || quantity < 1):
      return templates.quantityNL;
    case (typeof quantity !== 'number'):
      return templates.quantityN;
    case (duplicate && duplicate.name === name):
      return templates.duplicate;
    default:
      if (duplicate) return templates.ok;
      templates.ok.status = 200;
      return templates.ok;
  }
}

module.exports = {
  validadeProduct,
};
