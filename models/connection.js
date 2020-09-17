const { MongoClient } = require('mongodb');
//MUDA a conexao p o avaliador funcionar
const connect = () =>
  MongoClient
    .connect('mongodb://mongodb:27017/StoreManager', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db('StoreManager'));

module.exports = connect;
