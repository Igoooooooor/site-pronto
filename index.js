// backend/index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const db = new sqlite3.Database('./users.db');
app.use(express.json());
app.use(cors());

// Criar tabela de usuários
db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)`);

// Rota para registrar usuários
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Preencha todos os campos' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao registrar usuário' });
        res.json({ message: 'Conta criada com sucesso!' });
    });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));