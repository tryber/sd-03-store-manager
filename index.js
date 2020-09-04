const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const productController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
mongoose.connect('mongodb://mongodb:27017/StoreManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(bodyparser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', productController.productController);
app.get('/products', productController.listProducts);
app.get('/products/:id', productController.getProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesController.createSale);
app.get('/sales', salesController.listSales);
app.get('/sales/:id', salesController.getSale);
app.put('/sales/:id', salesController.updateSale);
app.delete('/sales/:id', salesController.deleteSale);

app.listen(3000, () => console.log('Listen on port 3000'));
