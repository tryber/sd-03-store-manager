const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productController);

app.use('/sales', salesController);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
