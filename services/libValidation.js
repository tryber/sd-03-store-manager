const validateId = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (!regex.test(id)) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }
  return null;
};

const validateParams = (quantity) => {
  if (quantity < 1) {
    return {
      err:
        { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  if (quantity === 0) {
    return {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  if (typeof quantity !== 'number') {
    return {
      err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' },
    };
  }
  return null;
};

module.exports = { validateParams, validateId };
