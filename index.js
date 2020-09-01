const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const controllers = require('./controller/productsController');

const app = express();
mongoose.connect('mongodb://localhost:27017/StoreManager', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(bodyparser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', controllers.productController);

app.get('/products', controllers.listProducts);

app.get('/products/:id', controllers.getProduct);

app.put('/products/:id', controllers.updateProduct);

app.listen(3000, () => console.log('listen to port 3000'));
