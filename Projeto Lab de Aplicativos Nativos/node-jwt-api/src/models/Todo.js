const { Schema, model, Types } = require('mongoose');


const todoSchema = new Schema({
title: { type: String, required: true, trim: true },
done: { type: Boolean, default: false },
owner: { type: Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });


todoSchema.set('toJSON', {
transform: (_, ret) => {
ret.id = ret._id;
delete ret._id;
delete ret.__v;
return ret;
}
});


module.exports = model('Todo', todoSchema);