const User = require('../models/User');
const { verifyAccessToken } = require('../utils/jwt');
const { unauthorized } = require('../errors');


function extractBearer(req) {
const header = req.headers['authorization'] || '';
const [type, token] = header.split(' ');
if (type !== 'Bearer' || !token) return null;
return token;
}


async function auth(req, _res, next) {
try {
const token = extractBearer(req);
if (!token) return next(unauthorized('Token ausente'));


const payload = verifyAccessToken(token);
if (payload.type !== 'access') return next(unauthorized('Token inválido'));


const user = await User.findById(payload.sub);
if (!user) return next(unauthorized('Usuário não encontrado'));


req.user = user; // anexar usuário
next();
} catch (err) {
return next(unauthorized('Acesso negado'));
}
}


module.exports = auth;