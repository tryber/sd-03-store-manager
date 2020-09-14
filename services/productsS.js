const express = require('express');
// const path = require('path');

const router = express.Router();

// SERVIÇO, DEVE TRATAR E ENCAMINHAR PARA O MODEL ATUAR NO BANCO
router.get('/', (_req, _res, next) => {
  console.log('Bati na rota GET');
  return next();
});

router.post('/', (_req, _res, next) => {
  console.log('Bati na rota POST');
  return next();
});

module.exports = router;
