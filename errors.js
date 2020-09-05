const invaliddataError = (message) => ({ error: true, code: 'invalid_data', status: 422, message });

module.exports = {
  invaliddataError,
};
