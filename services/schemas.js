const Joi = require('joi');

const idSchema = Joi.string().max(24).min(24)
  .error(() => new Error('Wrong product ID or invalid quantity'));

const productName = Joi.string().min(5)
  .error(() => new Error('"name" length must be at least 5 characters long'));

const productQuantity = Joi.number().integer().min(1)
  .error(([{ local }]) => new Error(
    (typeof local.value !== 'number')
    ? '"quantity" must be a number'
    : '"quantity" must be larger than or equal to 1',
  ),
);

const productSchema = Joi.object({
  name: productName.required(),
  quantity: productQuantity.required(),
});

const saleProductSchema = Joi.object({
  productId: idSchema.required(),
  quantity: productQuantity.required(),
}).error(() => new Error('Wrong product ID or invalid quantity'));

const saleSchema = Joi.object({
  products: Joi.array().items(
    saleProductSchema.required(),
  ).required(),
});


module.exports = {
  saleProductSchema,
  productSchema,
  saleSchema,
};
