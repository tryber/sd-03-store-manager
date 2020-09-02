const { generateError } = require('../controllers/utils');

module.exports = (callback, body = true) => async (req, res, next) => {
  try {
    const data = body ? await callback(req.body) : await callback();
    const errorMessage = data[0].message || data.message;

    if (errorMessage) throw new Error(errorMessage);

    return res.status(200).json(data);
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};
