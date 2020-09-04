require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const { errorMiddleware } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', controllers.productsController.productsRegister);
app.get('/products', controllers.productsController.listProducts);

app.get('/products/:id', controllers.productsController.listProductById);
app.put('/products/:id', controllers.productsController.updateProductsById);
app.delete('/products/:id', controllers.productsController.deleteProductsById);

app.use((err, _req, res, _next) => errorMiddleware(err, res));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on 3000'));
