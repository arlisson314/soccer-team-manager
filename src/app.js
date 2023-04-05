const express = require('express');
const teams = require('./mock');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.status(200).json({ message: 'Olá mundo!' }));

app.get('/teams', (_req, res) => res.status(200).json({ teams }));

app.get('/teams/:id', (req, res) => {
  const { id } = req.params;
  const time = teams.filter((team) => team.id === Number(id));
  if (time.length) { return res.status(200).json(time); }
  return res.status(400).json({ message: 'Time não encontrado.' });
});

app.post('/teams', (req, res) => {
  const newTeam = req.body;
  teams.push(newTeam);
  return res.status(201).json({ message: 'Time adicionado com sucesso!' });
});

app.put('/teams/:id', (req, res) => {
  const { id } = req.params;

  if (!req.body.name || !req.body.initials) {
    return res.status(422).json({ message: 'Dados invalidos!' });
  }

  const updatedTeam = teams.find((team) => team.id === Number(id));

  if (updatedTeam) {
    Object.assign(updatedTeam, req.body);
    return res.status(200).json(updatedTeam);
  }

  return res.status(400).json({ message: 'Time não encontrado.' });
});

app.patch('/teams/:id', (req, res) => {
  const { id } = req.params;

  if (!req.body.name) {
    return res.status(422).json({ message: 'Nome do time é obrigatorio!' });
  }

  const updatedTeam = teams.find((team) => team.id === Number(id));

  if (updatedTeam) {
    Object.assign(updatedTeam, req.body);
    return res.status(200).json(updatedTeam);
  }

  return res.status(400).json({ message: 'Time não encontrado.' });
});

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const index = teams.findIndex((team) => team.id === Number(id));
  console.log(index);
  if (index >= 0) {
    teams.splice(index, 1);
    return res.status(200).json({ message: 'Time deletado com sucesso!' });
  }
  return res.status(400).json({ message: 'Time não encontrado.' });
});

module.exports = app;