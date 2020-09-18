// SERVICE: Valida as regras de negócio enviando apenas os dados necessários para o model!
const templates = {
  ok: { status: 200, err: { code: '', message: '' } },
  notOk: { status: 422,
    err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
  },
};

// duplicate
function validadeProduct(id, quantity) {
  switch (true) {
    case (!id || typeof id !== 'string'):
      return templates.notOk;
    case (!quantity || quantity < 1 || typeof quantity !== 'number'):
      return templates.notOk;
    // case (duplicate && duplicate.name === name):
    //   return templates.notOk;
    default:
      return templates.ok;
  }
}

module.exports = {
  validadeProduct,
};
