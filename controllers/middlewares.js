const Boom = require('@hapi/boom');
const { generic } = require('../services');

function verifyIdParam(req, _res, next) {
  const { id } = req.params;
  const isValid = generic.verifyId(id);

  if (isValid.error) {
    return next(Boom.badData('Wrong id format'));
  }

  return next();
}

module.exports = {
  verifyIdParam,
};
