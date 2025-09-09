// src/middlewares/validate.js
const { badRequest } = require('../errors');

function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body); // usando zod
      next();
    } catch (err) {
      return next(badRequest(err.errors?.[0]?.message || 'Dados inválidos'));
    }
  };
}

module.exports = { validate };
