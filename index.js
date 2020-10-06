const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use('/products', productsController);
app.use('/sales', salesController);
app.get('/', (_req, res) => {
    res.send();
});
app.use((err, _, res, _next) =>
  (err
    ? res.status(err.status).json(err.payload)
    : res.status(500).json({ message: 'Internal error' })));

app.listen(PORT, () => console.log(`Listen port ${PORT}`));
