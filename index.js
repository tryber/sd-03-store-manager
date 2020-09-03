const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

app.use('/products', productsController.products);

app.use((err, _req, res, _next) => {
  const { code, message } = err;
  return res.status(422).json({ err: { code, message } });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
