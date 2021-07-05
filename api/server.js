// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

console.log(Users);

const server = express();
server.use(express.json());

// POST /api/users
server.post('/api/users', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Posted to /api/users" });
});
// GET /api/users
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({message: err.message});
    });
});
// GET /api/users/:id
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Got /api/users/${id}`});
});
// DELETE /api/users/:id
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Deleted /api/users/${id}`});
});
// PUT /api/users/:id
server.get('/api/users', (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Put /api/users/${id}`});
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
