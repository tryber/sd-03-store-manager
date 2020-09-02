const generateError = (status, error) => ({
  status,
  payload: { err: { code: 'invalid_data', message: error.message } },
});

module.exports = { generateError };
