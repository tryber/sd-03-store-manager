module.exports = (error, _req, res, _next) => {
  const { err, status } = error;
  return res.status(status).json({ err });
};
