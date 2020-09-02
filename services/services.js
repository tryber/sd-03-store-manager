const storeModel = require('../model/storeModel');

const checkName = async (name) => {
  if (name.length < 5) return { err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };
  if (await storeModel.findByName(name)) return { err: { code: 'invalid_data', message: 'Product already exists' } };
  return false;
};

const checkQuantity = async (quantity) => {
  if (quantity < 1) return { err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
  if (typeof (quantity) !== 'number') return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  return false;
};

const validate = async (name, quantity) => {
  if ((await checkName(name)).err) return checkName(name);
  if ((await checkQuantity(quantity)).err) return checkQuantity(quantity);
  return true;
};

const validateSale = async (soldItems) => {
  const quantityCheck = soldItems.some(({ quantity }) => quantity < 1);
  const stringCheck = soldItems.some(({ quantity }) => typeof (quantity) !== 'number');
  const getPromise = soldItems
    .map(async ({ productId }) => await storeModel.getProductById(productId) !== null);
  const arr = await Promise.all(getPromise).then((data) => data);
  const idCheck = arr.some((e) => !e);

  if (quantityCheck || idCheck || stringCheck) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  const returnedPromise = soldItems.map(async ({ productId, quantity }) => {
    const totalInStock = (await storeModel.getProductById(productId)).quantity;
    return quantity > totalInStock;
  });
  const isTrue = await Promise.all(returnedPromise).then((data) => data);
  if (isTrue.some((e) => e)) {
    return {
      err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
    };
  }

  return true;
};

const validateUpdate = async (name, quantity) => {
  if (name.length < 5) return { err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };
  if (quantity < 1) return { err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
  if (typeof (quantity) !== 'number') return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  return true;
};

const validateSalesUpdate = async (soldItems) => {
  const quantityCheck = soldItems.some(({ quantity }) => quantity < 1);
  const stringCheck = soldItems.some(({ quantity }) => typeof (quantity) !== 'number');

  if (quantityCheck || stringCheck) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  return true;
};

const serviceGetAllProducts = () => storeModel.getAllProducts();

const serviceCreateProduct = async ({ name, quantity }) => {
  const product = await validate(name, quantity);
  console.log(product);
  if (product.err) return product;
  return storeModel.createProduct(name, quantity);
};

const serviceGetProductById = async (id) => {
  const product = await storeModel.getProductById(id);
  if (!product) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  return product;
};

const serviceUpdateProduct = async (id, { name, quantity }) => {
  const product = await validateUpdate(name, quantity);
  if (product.err) return product;
  return storeModel.updateProduct(id, { name, quantity });
};

const serviceDeleteProduct = async (id) => {
  const product = await storeModel.getProductById(id);
  if (!product) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  await storeModel.deleteProduct(id);
  return product;
};

const serviceCreateSale = async (soldItems) => {
  const sale = await validateSale(soldItems);
  if (sale.err) return sale;
  storeModel.updateProductAfterSale(soldItems);
  return storeModel.createSale(soldItems);
};

const serviceGetAllSales = async () => storeModel.getAllSales();

const serviceGetSaleById = async (id) => {
  const sale = await storeModel.getSaleById(id);
  if (!sale) return { err: { code: 'not_found', message: 'Sale not found' } };
  return sale;
};

const serviceUpdateSale = async (id, soldItens) => {
  const sale = await validateSalesUpdate(soldItens);
  if (sale.err) return sale;
  return storeModel.updateSale(id, soldItens);
};

const serviceDeleteSale = async (id) => {
  const sale = await storeModel.getSaleById(id);
  if (!sale) return { err: { code: 'not_found', message: 'Wrong sale ID format' } };
  storeModel.updateProductAfterDeletion(sale);
  await storeModel.deleteSale(id);
  return sale;
};

module.exports = {
  serviceCreateProduct,
  serviceGetAllProducts,
  serviceGetProductById,
  serviceUpdateProduct,
  serviceDeleteProduct,
  serviceCreateSale,
  serviceGetAllSales,
  serviceGetSaleById,
  serviceUpdateSale,
  serviceDeleteSale,
};
