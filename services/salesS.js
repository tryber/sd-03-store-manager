// SERVICE: Valida as regras de negócio enviando apenas os dados necessários para o model!
const { ObjectId } = require('mongodb');
const { createSale, getAllSales, getSalesById, updateSale, deleteSale } = require('../models/salesM');

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

const CreateSale = async (salesArr) => {
  const sales = salesArr.reduce((acc, i) =>
    (validadeProduct(i.productId, i.quantity) ? acc : false),
  true);
  const sale = sales && await createSale(salesArr);
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
  const isValidSale = validadeProduct(id, 1);
  const isValidProd = validadeProduct(sale.productId, sale.quantity);
  if (!isValidSale || !isValidProd) throw new Error();
  const updatedSale = await updateSale(id, sale);
  return updatedSale.value;
};

const DeleteSale = async (id) => {
  const isValid = validadeProduct(id, 1);
  if (!isValid) throw new Error();
  const duplicate = await ReturnSales(id);
  if (!duplicate) throw new Error();
  const deletedSale = await deleteSale(id);
  return deletedSale.value;
};

module.exports = {
  CreateSale,
  DeleteSale,
  ReturnSales,
  UpdateSale,
};
