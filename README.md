## Matheus Beiruth


# 📌 Node JWT API

API de autenticação e gerenciamento de tarefas (TODOs) construída com **Node.js**, **Express**, **MongoDB** e **JWT**.

---

## 🚀 Tecnologias
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Bcrypt (hash de senhas)
- Joi (validação de dados)
- Dotenv (variáveis de ambiente)

---

## 📂 Estrutura do Projeto

src/
 ├── config/        # Configuração do banco (db.js)
 ├── controllers/   # Lógica das rotas
 ├── middlewares/   # Middlewares (auth, validate)
 ├── models/        # Modelos do Mongoose
 ├── routes/        # Definição das rotas
 ├── validators/    # Schemas de validação (Zod/Joi/Yup)
 ├── errors.js      # Tratamento de erros
 └── index.js       # Ponto de entrada do servidor



---

## ⚙️ Configuração

1. Clone este repositório:
   ```bash
   git clone https://github.com/seuusuario/node-jwt-api.git


2. Instale as dependências:
    npm install

3. Crie um arquivo .env na raiz do projeto:
# Servidor
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/node_jwt_api

# JWT
ACCESS_TOKEN_SECRET=sua-chave-secreta-aqui
REFRESH_TOKEN_SECRET=outra-chave-secreta
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d

# Bcrypt
BCRYPT_SALT_ROUNDS=10

4. Inicie o servidor:
    npm run dev
    Servidor rodará em:
👉  http://localhost:3000


🔑 Rotas da API

1. Autenticação

📌 Registrar usuário
POST /auth/register
Body (JSON):
{
  "name": "João da Silva",
  "email": "joao@example.com",
  "password": "123456"
}

📌 Login
POST /auth/login
Body (JSON):
{
  "email": "joao@example.com",
  "password": "123456"
}
Resposta:
{
  "accessToken": "jwt-token",
  "refreshToken": "jwt-refresh-token"
}

📌 Refresh Token
POST /auth/refresh
Body (JSON):
{
  "refreshToken": "jwt-refresh-token"
}

2. TODOs (protegidas por autenticação)

Necessário enviar Authorization: Bearer <accessToken> no header.

Criar tarefa
POST /todos
{
  "title": "Estudar Node.js",
  "description": "Praticar autenticação com JWT"
}

Listar tarefas
GET /todos

Buscar tarefa pro ID
GET /todos/:id


Atualizar tarefa
PUT /todos/:id
{
  "title": "Estudar MongoDB",
  "description": "Revisar Mongoose"
}


Deletar tarefa
DELETE /todos/:id


🧪 Testando no Postman

1. Registre um usuário em POST /auth/register.

2. Faça login em POST /auth/login e copie o accessToken.

3. Em qualquer rota de /todos, adicione no Header: Authorization: Bearer seuAccessTokenAqui

4. Teste as operações de CRUD.


📜 Licença

Este projeto é apenas para fins educacionais.