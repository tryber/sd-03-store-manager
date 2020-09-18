const connect = require('./connect');
const { ObjectId } = require('mongodb');

const insert = async (itensSold) => connect()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold }));

const listAll = async () => connect()
.then((db) =>
  db
  .collection('sales')
  .find({})
  .toArray(),
);

const listOne = async (id) => connect()
.then((db) =>
  db
  .collection('sales')
  .findOne(ObjectId(id)),
);

const updateOne = async (id, itensSold) => {
  console.log('Model ', itensSold);
  return connect()
  .then((db) => db
    .collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } })
    .then(() => ({ _id: id, itensSold }))
    .catch((err) => err),
  );
};

const erase = async (id) => connect()
.then((db) =>
  db
  .collection('sales')
  .findOneAndDelete({ _id: ObjectId(id) }))
  .then((response) => (response.value));

module.exports = {
  insert,
  listAll,
  listOne,
  updateOne,
  erase,
};
