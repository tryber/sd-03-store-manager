const mongoose = require('mongoose');

const { Schema } = mongoose;

const saleSchema = new Schema({
  itensSold: [{
    _id: false,
    productId: String,
    quantity: Number,
  }],
});

const Sale = mongoose.model('Sale', saleSchema);

async function getSaleById(id) {
  return Sale.findById(id);
}

function mountSale(sale) {
  return ({
    itensSold: sale,
  });
}

async function createSale(data) {
  const d = mountSale(data);
  const sale = await Sale.create(d);
  return sale;
}

module.exports = {
  createSale,
};
