const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.use('/products', productController);
app.use('/sales', salesController);

app.listen(3000, () => console.log('App listening on port 3000!'));

