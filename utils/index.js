const generateError = (status = 404, error, code = '') => ({
    status,
    payload: { err: { code, message: error.message } },
  });

module.exports = { generateError };
