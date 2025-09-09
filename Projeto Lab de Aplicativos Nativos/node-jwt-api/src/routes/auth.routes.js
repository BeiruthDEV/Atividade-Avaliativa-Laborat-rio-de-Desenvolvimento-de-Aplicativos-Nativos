const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const { 
  signAccessToken, 
  signRefreshToken, 
  verifyRefreshToken, 
  hashToken 
} = require('../utils/jwt');
const { validate } = require('../middlewares/validate');
const { registerSchema, loginSchema, refreshSchema } = require('../validators/authSchemas');
const { badRequest, unauthorized } = require('../errors');
const { bcryptRounds } = require('../config');

const router = express.Router();

/**
 * Registro de usuário
 */
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return next(badRequest('Email já cadastrado'));

    const passwordHash = await bcrypt.hash(password, bcryptRounds);
    const user = await User.create({ name, email, passwordHash });

    return res.status(201).json({ user: user.toJSON() });
  } catch (err) {
    next(err);
  }
});

/**
 * Login
 */
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(unauthorized('Credenciais inválidas'));

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return next(unauthorized('Credenciais inválidas'));

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    // armazenar hash do refresh + expiração
    const payload = verifyRefreshToken(refreshToken);
    const expiresAt = new Date(payload.exp * 1000);

    await RefreshToken.create({
      user: user._id,
      tokenHash: hashToken(refreshToken),
      expiresAt,
    });

    return res.json({ 
      user: user.toJSON(), 
      accessToken, 
      refreshToken 
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Refresh token
 */
router.post('/refresh', validate(refreshSchema), async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
      if (payload.type !== 'refresh') throw new Error('tipo inválido');
    } catch (e) {
      return next(unauthorized('Refresh token inválido'));
    }

    const tokenHash = hashToken(refreshToken);
    const stored = await RefreshToken.findOne({ tokenHash, revokedAt: { $exists: false } });
    if (!stored) return next(unauthorized('Refresh token não reconhecido'));

    // revoga o token antigo
    stored.revokedAt = new Date();
    await stored.save();

    // busca usuário
    const user = await User.findById(payload.sub);
    if (!user) return next(unauthorized('Usuário não encontrado'));

    // gera novos tokens
    const newAccess = signAccessToken(user);
    const newRefresh = signRefreshToken(user);

    const newPayload = verifyRefreshToken(newRefresh);
    await RefreshToken.create({
      user: user._id,
      tokenHash: hashToken(newRefresh),
      expiresAt: new Date(newPayload.exp * 1000),
    });

    return res.json({
      user: user.toJSON(),
      accessToken: newAccess,
      refreshToken: newRefresh,
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
