const express = require('express');
const bodyParser = require('body-parser');

const { products } = require('./controllers/productsController');
const { sales } = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => response.send());

app.post('/products', products); // 1
app.get('/products', products); // 2
app.get('/products/:id', products); // 2
app.put('/products/:id', products); // 3
app.delete('/products/:id', products); // 4

app.post('/sales', sales); // 5
app.get('/sales', sales); // 6
app.get('/sales/:id', sales); // 6
app.put('/sales/:id', sales); // 7
app.delete('/sales/:id', sales); // 8

// app.use((err, _req, res, _next) => {
//   if (err) {
//     return res.status(303).json({ message: 'Error caiu no if' });
//   }
//   return res.status(500).json({ message: 'Error do else' });
// });

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
