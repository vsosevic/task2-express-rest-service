const router = require('express').Router({mergeParams: true});
const {ReasonPhrases, StatusCodes} = require('http-status-codes');
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
    try {
        const tasks = await tasksService.getAll();
        if (tasks) {
            return res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const {id} = req.params;
        const task = await tasksService.getById(id);
        if (task) {
            return res.json(Task.toResponse(task));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/').post(async (req, res) => {
    try {
        const {boardId} = req.params;
        const {title, order, description, userId, columnId} = req.body
        const taskObj = {
            "title": title,
            "order": order,
            "description": description,
            "userId": userId,
            "boardId": boardId,
            "columnId": columnId
        };
        const task = await tasksService.addTask(taskObj);
        return res.status(StatusCodes.CREATED).json(Task.toResponse(task));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').put(async (req, res) => {
    try {
        const {id} = req.params;
        const task = await tasksService.updateTask(id, req.body);
        return res.status(StatusCodes.OK).json(Task.toResponse(task));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        const {id} = req.params;
        const task = await tasksService.getById(id);
        if (task) {
            await tasksService.deleteTask(task.id);
            return res.status(StatusCodes.NO_CONTENT).json();
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

module.exports = router;
