const { z } = require('zod');

const todoSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  done: z.boolean().optional().default(false),
});

module.exports = { todoSchema };
