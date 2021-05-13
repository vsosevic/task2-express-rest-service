const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  // map user fields to exclude secret fields like "password"
  if (user) {
    return res.json(User.toResponse(user));
  }
  res.status(404).send('404 Not found');
});

module.exports = router;
