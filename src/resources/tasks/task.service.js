const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = (id) => tasksRepo.getById(id);
const addTask = (task) => tasksRepo.addTask(task);
const updateTask = (id, task) => tasksRepo.updateTask(id, task);
const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getById, addTask, updateTask, deleteTask };
