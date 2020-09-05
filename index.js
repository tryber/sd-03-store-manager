const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const ProductController = require('./controller/productsController');
const SalesControler = require('./controller/salesController');

const app = express();
mongoose.connect('mongodb://mongodb:27017/StoreManager', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(bodyparser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', ProductController.productController);
app.get('/products', ProductController.listProducts);
app.get('/products/:id', ProductController.getProduct);
app.put('/products/:id', ProductController.updateProduct);
app.delete('/products/:id', ProductController.deleteProduct);

app.post('/sales', SalesControler.createSale);
app.get('/sales', SalesControler.listSales);
app.get('/sales/:id', SalesControler.getSale);
app.put('/sales/:id', SalesControler.updateSale);
app.delete('/sales/:id', SalesControler.deleteSale);

app.listen(3000, () => console.log('Listen on port 3000'));
