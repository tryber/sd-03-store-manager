const { Product } = require('../models/produtos');

function update(id, qty) {
  return Product.findById(id, (err, doc) => {
    if (err) return err;
    doc.quantity += qty;
    doc.save();
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
module.exports = { updater, updaterDelete };
