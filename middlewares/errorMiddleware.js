module.exports = (err, res) => {
  if (err.message === 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters') {
    return res.status(400).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        stack: err.stack,
      },
    });
  }
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
