module.exports = (error, status, code, message) => {
  const err = new Error(error);
  err.status = status;
  err.code = code;
  err.message = message;
  throw err;
};
