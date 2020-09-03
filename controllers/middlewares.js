const Boom = require('@hapi/boom');
const { generic } = require('../services');

function verifyIdParam(message = 'Wrong id format') {
  return (req, _res, next) => {
    const { id } = req.params;
    const isValid = generic.verifyId(id);

    if (isValid.error) return next(Boom.badData(message, 'invalid_data'));

    return next();
  }
}

module.exports = {
  verifyIdParam,
};
