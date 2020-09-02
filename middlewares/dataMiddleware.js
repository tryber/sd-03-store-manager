const { generateError } = require('../controllers/utils');

module.exports = (callback) => async (req, res, next) => {
  try {
    const data = await callback(req.body);
    const errorMessage = data.message || data[0].message;

    if (errorMessage) throw new Error(errorMessage);

    return res.status(200).json(data);
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};
