const router = require('express').Router({mergeParams:true});
const Task = require('./task.model');
const tasksService = require('./task.service');
const uuid = require('uuid').v4;

router.route('/').get(async (req, res) => {
    const tasks = await tasksService.getAll();
    // map task fields to exclude secret fields like "password"\
    const task = new Task();
    res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
    const {id} = req.params;
    const task = await tasksService.getById(id);
    // map task fields to exclude secret fields like "password"
    if (task) {
        return res.json(Task.toResponse(task));
    }
    return res.status(404).send('404 Not found');
});

router.route('/').post(async (req, res) => {
    const {title, order, description, userId ,boardId, columnId} = req.body
    const taskObj = {
        "id": uuid(),
        "title": title,
        "order": order,
        "description": description,
        "userId": userId,
        "boardId": boardId,
        "columnId": columnId
    };
    await tasksService.addTask(taskObj);
    res.status(201).json(Task.toResponse(taskObj));
});

router.route('/:id').put(async (req, res) => {
    const {id} = req.params;
    const {title, order, description, userId ,boardId, columnId} = req.body
    const taskObj = {
        "id": uuid(),
        "title": title,
        "order": order,
        "description": description,
        "userId": userId,
        "boardId": boardId,
        "columnId": columnId
    };
    await tasksService.updateTask(id, taskObj);
    res.status(200).json(Task.toResponse(taskObj));
});

router.route('/:id').delete(async (req, res) => {
    const {id} = req.params;
    const task = await tasksService.getById(id);
    if (task) {
        await tasksService.deleteTask(task.id);
        return res.status(204).json();
    }
    return res.status(404).send('Not found');
});

module.exports = router;