const validateId = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (!regex.test(id)) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }
  return null;
};

const validateParams = (quantity) => {
  let response;
  if (quantity < 1) {
    response = {
      err:
        { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  if (quantity === 0) {
    response = {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  if (typeof quantity !== 'number') {
    response = {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  return response;
};

module.exports = { validateParams, validateId };
