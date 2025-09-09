const { Schema, model } = require('mongoose');


const userSchema = new Schema({
name: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, trim: true },
passwordHash: { type: String, required: true },
}, { timestamps: true });


userSchema.set('toJSON', {
transform: (_, ret) => {
ret.id = ret._id;
delete ret._id;
delete ret.__v;
delete ret.passwordHash;
return ret;
}
});


module.exports = model('User', userSchema);