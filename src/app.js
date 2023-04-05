const express = require('express');
const teams = require('./mock');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.status(200).json({ message: 'Olá mundo!' }));
app.get('/teams', (_req, res) => res.status(200).json({ teams }));
app.post('/teams', (req, res) => {
  const newTeam = req.body;
  teams.push(newTeam);
  res.status(201).json({ message: 'Time adicionado com sucesso!' });
});

module.exports = app;