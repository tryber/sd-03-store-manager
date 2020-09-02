const Boom = require('@hapi/boom');
const { verifyId } = require('../services');

function verifyIdParam(req, _res, next) {
  const { id } = req.params;
  const isValid = verifyId(id);

  if (isValid.error) {
    return next(Boom.notAcceptable(isValid.message));
  }

  return next();
}

module.exports = {
  verifyIdParam,
};
