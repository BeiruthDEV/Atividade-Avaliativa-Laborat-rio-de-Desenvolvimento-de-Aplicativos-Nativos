// src/routes/me.routes.js
const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

// Rota para retornar dados do usuário autenticado
router.get('/', auth, async (req, res, next) => {
  try {
    res.json(req.user); // o `auth` já adiciona o user no req
  } catch (err) {
    next(err);
  }
});

module.exports = router;
