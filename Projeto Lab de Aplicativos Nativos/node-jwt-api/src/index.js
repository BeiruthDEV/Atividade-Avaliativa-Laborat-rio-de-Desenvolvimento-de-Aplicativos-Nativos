require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require("./config/db");
const { port } = require('./config');

// Rotas
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todos.routes');
const meRoutes = require('./routes/me.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/me', meRoutes);

// Conexão com Mongo e inicialização do servidor
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar no MongoDB', err);
  process.exit(1);
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
});