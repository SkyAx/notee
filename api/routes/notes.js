const { Router } = require('express');

const router = Router();

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
];

/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router.get('/users', function (req, res, next) {
  res.json(users);
});

/* GET user by ID. */
// eslint-disable-next-line no-unused-vars
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
