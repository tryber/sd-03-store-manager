const mongoose = require('mongoose');
const { updater, updaterDelete } = require('../services/updatations');

const { Schema } = mongoose;

const saleSchema = new Schema({
  itensSold: [{
    _id: false,
    productId: String,
    quantity: Number,
  }],
});

const Sale = mongoose.model('Sale', saleSchema);

function mountSale(sale) {
  return ({
    itensSold: sale,
  });
}

async function createSale(data) {
  const d = mountSale(data);
  const sale = await Sale.create(d);
  await updater(data);
  return sale;
}

async function listSales() {
  return Sale.find();
}

async function getSaleById(id) {
  return Sale.findById(id);
}
async function updateSale(id, data) {
  return Sale.findByIdAndUpdate(id, mountSale(data), { new: true });
}

async function deleteSale(id) {
  const product = await Sale.findByIdAndRemove(id);
  await updaterDelete(product.itensSold);
  return product;
}
module.exports = {
  Sale,
  createSale,
  listSales,
  getSaleById,
  updateSale,
  deleteSale,
};
