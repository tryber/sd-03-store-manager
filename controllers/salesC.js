// CONTROLLER: trata as requisições e envia somente o necessário para o service!
const express = require('express');
// const path = require('path');
// const productService = require('../services/salesS');
// const productModel = require('../models/salesM');

const router = express.Router();

// router.get('/', async (req, res) => {
//   try {

//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//   } catch (err) {
//     console.error(err);
//     next();
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
//     const info = req.body;
//     console.log(info);
//     return res.json(info);
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// });

// router.put('/:id', async (req, res, next) => {
//   try {
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//   } catch (err) {
//     console.error(err);
//     next();
//   }
// });

module.exports = router;
