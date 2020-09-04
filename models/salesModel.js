const connection = require('./connection');

// Criar uma nova venda
const createSale = async (arrProd) => {
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: [...arrProd] }))
    .then((result) => ({ _id: result.insertedId, itensSold: result.ops }));
};

module.exports = {
  createSale,
};
