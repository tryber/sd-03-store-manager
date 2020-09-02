const handleApiError = (errorControl, errorCode) => (req, res, next) => {
  if (errorControl) return next();

  { error: { message: error.message, code: errorCode } }
}

module.exports = {
  handleApiError,
};
