const { connectTo } = require('./connect');

async function add(name, quantity) {
  const productsColl = await connectTo('products');
  return  productsColl.insertOne({ name, quantity });
}

async function getByName(name) {
  const productsColl = await connectTo('products');
  return productsColl.findOne({ name });
}

module.exports = {
  add,
  getByName,
};
