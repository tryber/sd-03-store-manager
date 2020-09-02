const { generateError } = require('../controllers/utils');

const data = async (body, callback, obj = {}) => {
  const exec = body ? await callback(obj) : await callback();
  return exec;
};

module.exports = (callback, body = true) => async (req, res, next) => {
  try {
    const appData = await data(body, callback, req.body);
    const errorMessage = appData[0].message || appData.message;

    if (errorMessage) throw new Error(errorMessage);

    return res.status(200).json(data);
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};
