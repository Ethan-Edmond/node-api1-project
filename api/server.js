// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();
server.use(express.json());

const catch500 = (res) => {
  return (err) => {
    res.status(500).json({ message: err.message });
  };
};

// POST /api/users
server.post('/api/users', (req, res) => {
  if (req.body.name && req.body.bio) {
    const { name, bio } = req.body;
    Users.insert({ name, bio })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: 'There was an error while saving the user to the database' });
      });
  } else {
    res.status(400).json({ message: 'Please provide name and bio for the user' });
  }
});

// GET /api/users
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'The users information could not be retrieved' });
    });
});

// GET /api/users/:id
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(user => {
      if(user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'The user information could not be retrieved' });
    });
});

// DELETE /api/users/:id
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(user => {
      if(user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'The user could not be removed' });
    });
});

// PUT /api/users/:id
server.put('/api/users/:id', (req, res) => {
  if (req.body.name && req.body.bio) {
    const { name, bio } = req.body;
    const id = req.params.id;
    Users.update(id, { name, bio })
      .then(user => {
        if (user) {
          res.status(200).json(user);
	} else {
	  res.status(404).json({ message: 'The user with the specified ID does not exist' });
	}
      })
      .catch(err => {
        res.status(500).json({ message: 'The user information could not be modified' });
      });
  } else {
    res.status(400).json({ message: 'Please provide name and bio for the user' });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
