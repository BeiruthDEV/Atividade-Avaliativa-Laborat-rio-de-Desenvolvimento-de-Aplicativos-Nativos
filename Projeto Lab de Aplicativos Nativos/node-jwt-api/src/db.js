const mongoose = require('mongoose');
const { mongoUri } = require('./config');


async function connectDB() {
if (!mongoUri) throw new Error('MONGO_URI não configurado');
await mongoose.connect(mongoUri, { dbName: undefined });
console.log('⚡️ MongoDB conectado');
}


module.exports = { connectDB };