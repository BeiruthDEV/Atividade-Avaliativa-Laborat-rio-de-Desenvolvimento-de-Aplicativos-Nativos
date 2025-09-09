const { Schema, model, Types } = require('mongoose');


const refreshTokenSchema = new Schema({
user: { type: Types.ObjectId, ref: 'User', required: true },
tokenHash: { type: String, required: true, index: true, unique: true },
expiresAt: { type: Date, required: true },
revokedAt: { type: Date },
}, { timestamps: true });


// TTL index: documentos expiram automaticamente quando expiresAt é alcançado
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


module.exports = model('RefreshToken', refreshTokenSchema);