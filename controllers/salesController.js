// const { Router } = require('express');
// const { registeringSales } = require('../services/salesService');

// const sales = Router();

// sales.post('/sales', async (req, res) => {
//   const { id } = req.user;
//   const { productid, quantity } = req.body;

//   const register = await registeringSales(productid, quantity);

//   if (register.err) {
//     return res.status(422).json(register);
//   }
//   return res.status(200).json(register);
// });

// sales.get('/sales', async (req, res) => {

// });

// sales.get('/sales/:id', async (req, res) => {

// });

// sales.put('/sales/:id', async (req, res) => {

// });

// sales.delete('/sales/:id', async (req, res) => {

// });

// module.exports = { sales };
