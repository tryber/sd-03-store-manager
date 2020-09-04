module.exports = (err, res) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      err: {
        code: err.code,
        message: err.message,
        stack: err.stack,
      },
    });
  }
  return res.status(500).json({
    err: {
      error: err.message,
      message: 'Internal error',
      stack: err.stack,
    },
  });
};
