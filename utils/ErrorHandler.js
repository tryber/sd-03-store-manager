class ErrorHandler extends Error {
  constructor(statusCode, message, code) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.code = code;
  }
}

module.exports = {
  ErrorHandler,
};
// module.exports = (error, status, code, message) => {
//   const err = new Error(error);
//   err.status = status;
//   err.code = code;
//   err.message = message;
//   throw err;
// };
