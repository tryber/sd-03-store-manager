require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const controllers = require('./controllers');
const { productsRouter } = require('./controllers/routers/productsRouter');
const { salesRouter } = require('./controllers/routers/salesRouter');
const { errorMiddleware } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use((err, _req, res, _next) => errorMiddleware(err, res));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on 3000'));
