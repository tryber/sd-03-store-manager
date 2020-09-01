const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.use('/products', productController);
// app.get('/products', controllers.productController.registerProduct);

// app.use((err, _req, res, _next) =>
//   res.status(500).json({ message: err.message, stack: err.stack }));

app.listen(3000, () => console.log('App listening on port 3000!'));
