const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);
const getById = (id) => tasksRepo.getById(id);
const addTask = (task) => tasksRepo.addTask(task);
const updateTask = (id, task) => tasksRepo.updateTask(id, task);
const deleteTask = (id) => tasksRepo.deleteTask(id);
const deleteTasksByBoardId = async (boardId) => {
    const tasks = await tasksRepo.getAll();
    if (tasks) {
        // console.log('attempted to delete', boardId);
         await tasks.filter(async (task) => {
            if (task.boardId === boardId) {
                // console.log('want to delete task id', task.id, 'with board id', task.boardId);
                await tasksRepo.deleteTask(task.id);
            }
        });
    }
}
const unassignUser = async (userId) => tasksRepo.unassignUser(userId);

module.exports = {getAll, getById, addTask, updateTask, deleteTask, deleteTasksByBoardId, unassignUser};
