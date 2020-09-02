const mongoClient = require('mongodb').MongoClient;

module.exports = () =>
  mongoClient
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(process.env.DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
