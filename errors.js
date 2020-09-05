const invaliddataError = (message) => ({ error: true, code: 'invalid_data', status: 422, message });
const notFound = (message) => ({ error: true, code: 'not_found', status: 404, message });
module.exports = {
  invaliddataError,
  notFound,
};
