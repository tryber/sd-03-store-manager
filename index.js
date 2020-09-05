const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/productRouter');

const app = express();
app.use(bodyParser.json());
app.use('/products', product);

app.get('/', (request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const { code, message, status } = err;
  if (status < 500) {
    return res.status(status).json({ err: { code, message } });
  }
  return res.status(500).json({ err: '{ code, message }' });
});

app.listen(3000, () => console.log('ok'));
