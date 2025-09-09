const { z } = require('zod');


const registerSchema = z.object({
name: z.string().min(1, 'obrigatório'),
email: z.string().email('email inválido'),
password: z.string().min(8, 'mínimo 8 caracteres'),
});


const loginSchema = z.object({
email: z.string().email(),
password: z.string().min(8),
});


const refreshSchema = z.object({
refreshToken: z.string().min(1),
});


module.exports = { registerSchema, loginSchema, refreshSchema };