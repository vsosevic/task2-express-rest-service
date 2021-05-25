const router = require('express').Router();
const {ReasonPhrases, StatusCodes} = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
    try {
        const users = await usersService.getAll();
        return res.status(StatusCodes.OK).json(users.map(User.toResponse));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const {id} = req.params;
        const user = await usersService.getById(id);
        if (user) {
            return res.status(StatusCodes.OK).json(User.toResponse(user));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/').post(async (req, res) => {
    try {
        const user = await usersService.addUser(req.body);
        return res.status(StatusCodes.CREATED).json(User.toResponse(user));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').put(async (req, res) => {
    try {
        const {id} = req.params;
        const user = await usersService.updateUser(id, req.body);
        return res.status(StatusCodes.OK).json(User.toResponse(user));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        const {id} = req.params;
        const user = await usersService.getById(id);
        if (user) {
            await usersService.deleteUser(user.id);
            return res.status(StatusCodes.NO_CONTENT).json();
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

module.exports = router;
