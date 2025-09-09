require('dotenv').config();


module.exports = {
port: process.env.PORT || 3000,
mongoUri: process.env.MONGO_URI,
accessSecret: process.env.ACCESS_TOKEN_SECRET,
refreshSecret: process.env.REFRESH_TOKEN_SECRET,
accessTtl: process.env.ACCESS_TOKEN_TTL || '15m',
refreshTtl: process.env.REFRESH_TOKEN_TTL || '7d',
bcryptRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
};