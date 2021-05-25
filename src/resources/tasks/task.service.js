const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = (boardId) => tasksRepo.getAll(boardId);
const getById = (id) => tasksRepo.getById(id);
const addTask = (data) => {
    const task = new Task({...data});
    return tasksRepo.addTask(task);
};
const updateTask = (id, data) => {
    const task = new Task({...data});
    return tasksRepo.updateTask(id, task);
};
const deleteTask = (id) => tasksRepo.deleteTask(id);
const deleteTasksByBoardId = async (boardId) => {
    const tasks = await tasksRepo.getAll();
    if (tasks) {
        tasks.map((task) => {
            if (task.boardId === boardId) {
                tasksRepo.deleteTask(task.id);
                return true;
            }
            return false;
        });
    }
}
const unassignUser = async (userId) => tasksRepo.unassignUser(userId);

module.exports = {getAll, getById, addTask, updateTask, deleteTask, deleteTasksByBoardId, unassignUser};
