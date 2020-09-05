const { Product } = require('../models/products');

function update(id, qty) {
  return Product.findById(id, (err, doc) => {
    const d = doc;
    if (err) return err;
    d.quantity += qty;
    d.save();
  });
}

async function updater(sale) {
  console.log(sale);
  return sale.forEach(async (i) => {
    await update(i.productId, -i.quantity);
  });
}

async function updaterDelete(sale) {
  return sale.forEach(async (i) => {
    await update(i.productId, +i.quantity);
  });
}
module.exports = {
  updater,
  updaterDelete,
};
