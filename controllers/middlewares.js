const Boom = require('@hapi/boom');
const rescue = require('express-rescue');
const { generic } = require('../services');
const { invalid } = require('joi');

function verifyIdParam(message = 'Wrong id format') {
  return (req, _res, next) => {
    const { id } = req.params;
    const isValid = generic.verifyId(id);

    if (isValid.error) return next(Boom.badData(message, 'invalid_data'));

    return next();
  };
}

/**
 * passa o recurso encontrado para req.resource
 * @param {function} service callback
 */
function findAndKeepById(service) {
  return rescue(async (req, res, next) => {
    const { id } = req.params;
    res.resource = await service(id);

    if (!res.resource) next(Boom.notFound('not_found'));

    return next();
  });
}

function notExistsByName(service) {
  return rescue(async (req, res, next) => {
    const { name } = req.body || {};
    const resource = await service(name);

    if (resource) next(Boom.badData('Product already exists', 'invalid_data'))

    return next();
  });
}

/**
 * complementa a função de cima
 * @param {bool} shouldExists
 */
function verifyExistence(shouldExists = true) {
  return (_req, res, next) => {
    const { resource } = res;
    console.log('resource', resource);
    const { error } = generic.handleExistence(resource, shouldExists) || {};

    if (error) return next(Boom.notFound(resource.message, 'invalid_data'));

    next();
  };
}

module.exports = {
  verifyIdParam,
  findAndKeepById,
  verifyExistence,
  notExistsByName,
};
