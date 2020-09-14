// SERVICE: Valida as regras de negócio enviando apenas os dados necessários para o model!
const express = require('express');
// const path = require('path');

const router = express.Router();

router.get('/', (_req, _res, next) => {
  console.log('Bati na rota GET');
  return next();
});

router.post('/', (_req, _res, next) => {
  console.log('Bati na rota POST');
  return next();
});

module.exports = router;
