const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const uuid = require('uuid').v4;

router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"\
    const user = new User();
    res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
    const {id} = req.params;
    const user = await usersService.getById(id);
    // map user fields to exclude secret fields like "password"
    if (user) {
        return res.json(User.toResponse(user));
    }
    return res.status(404).send('404 Not found');
});

router.route('/').post(async (req, res) => {
    const {name, login, password} = req.body
    const userObj = {
        "id": uuid(),
        "name": name,
        "login": login,
        "password": password
    };
    await usersService.addUser(userObj);
    res.status(201).json(User.toResponse(userObj));
});

router.route('/:id').put(async (req, res) => {
    const {id} = req.params;
    const {name, login, password} = req.body
    const userObj = {
        "name": name,
        "login": login,
        "password": password
    };
    await usersService.updateUser(id, userObj);
    res.status(200).json(User.toResponse(userObj));
});

router.route('/:id').delete(async (req, res) => {
    const {id} = req.params;
    const user = await usersService.getById(id);
    if (user) {
        await usersService.deleteUser(user.id);
        return res.status(200).json(user);
    }
    return res.status(400).send('Not found');
});

module.exports = router;
