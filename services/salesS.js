// SERVICE: Valida as regras de negócio enviando apenas os dados necessários para o model!
const { ObjectId } = require('mongodb');
const { createSale, getAllSales, getSalesById, updateSale, deleteSale } = require('../models/salesM');
const { deleteProduct, getProductsById, updateProduct } = require('../models/productsM');

function validadeProduct(id, quantity) {
  switch (true) {
    case (!id || !ObjectId(id)):
      return false;
    case (!quantity || quantity < 1 || typeof quantity !== 'number'):
      return false;
    default:
      return true;
  }
}

const removeProductFromStore = async (id, quantity) => {
  const product = await getProductsById(id);
  if (!product) return false;
  if (product.quantity > quantity) {
    return updateProduct(id, product.name, product.quantity - quantity);
  }
  if (product.quantity === quantity) {
    return deleteProduct(id);
  }
};

const addProductToStore = async (id, quantity) => {
  const product = await getProductsById(id);
  if (!product) return false;
  if (product.quantity < quantity) return false;
  return updateProduct(id, product.name, product.quantity + quantity);
};

const CreateSale = async (salesArr) => {
  const sales = await Promise.all(
    salesArr.map(async ({ productId, quantity }) =>
      (validadeProduct(productId, quantity) ? removeProductFromStore(productId, quantity) : false)),
  );
  const sale = !sales.includes(false) && await createSale(salesArr);
  return sale;
};

const ReturnSales = async (id) => {
  if (!id) {
    const sales = await getAllSales();
    return { sales };
  }
  const sales = await getSalesById(id);
  return sales;
};

const UpdateSale = async (id, saleArr) => {
  const sale = saleArr[0];
  const isValidSale = await validadeProduct(id, 1);
  const isValidProd = await validadeProduct(sale.productId, sale.quantity);
  if (!isValidSale || !isValidProd) throw new Error();
  const updatedSale = await updateSale(id, sale);
  return updatedSale.value;
};

const DeleteSale = async (id) => {
  const isValid = validadeProduct(id, 1);
  if (!isValid) throw new Error();
  const { value } = await deleteSale(id);
  const validQ = await addProductToStore(value.itensSold[0].productId, value.itensSold[0].quantity);
  if (!validQ) throw new Error('ERRO DOIDO');
  return value;
};

module.exports = {
  CreateSale,
  DeleteSale,
  ReturnSales,
  UpdateSale,
};
