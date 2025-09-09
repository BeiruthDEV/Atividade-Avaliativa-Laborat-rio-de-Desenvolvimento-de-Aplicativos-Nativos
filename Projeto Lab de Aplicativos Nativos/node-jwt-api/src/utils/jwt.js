const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { accessSecret, refreshSecret, accessTtl, refreshTtl } = require('../config');


function signAccessToken(user) {
return jwt.sign({ sub: String(user._id), type: 'access' }, accessSecret, { expiresIn: accessTtl });
}


function signRefreshToken(user) {
return jwt.sign({ sub: String(user._id), type: 'refresh' }, refreshSecret, { expiresIn: refreshTtl });
}


function verifyAccessToken(token) {
return jwt.verify(token, accessSecret);
}


function verifyRefreshToken(token) {
return jwt.verify(token, refreshSecret);
}


function hashToken(token) {
return crypto.createHash('sha256').update(token).digest('hex');
}


module.exports = {
signAccessToken,
signRefreshToken,
verifyAccessToken,
verifyRefreshToken,
hashToken,
};