const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { todoSchema } = require('../validators/todoSchemas');
const { notFound } = require('../errors');

const router = express.Router();

// Criar
router.post('/', auth, validate(todoSchema), async (req, res, next) => {
  try {
    const todo = await Todo.create({ ...req.body, owner: req.user._id });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

// Listar
router.get('/', auth, async (req, res, next) => {
  try {
    const todos = await Todo.find({ owner: req.user._id });
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

// Buscar por ID
router.get('/:id', auth, async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id });
    if (!todo) return next(notFound('Todo não encontrado'));
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

// Atualizar
router.put('/:id', auth, validate(todoSchema), async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!todo) return next(notFound('Todo não encontrado'));
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

// Deletar
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!todo) return next(notFound('Todo não encontrado'));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
