const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

/**
 * Return all tasks.
 * @returns {Promise<Array>} Array of task objects.
 */
const getAll = (boardId) => tasksRepo.getAll(boardId);

/**
 * Get Task by id.
 * @param {string} id - task id.
 * @returns {Promise<Object>} Task object.
 */
const getById = (id) => tasksRepo.getById(id);

/**
 * Add a Task to memory repository.
 * @param {Object} data - all the needed params to create a Task.
 * @returns {Promise<Object>} Task object.
 */
const addTask = (data) => {
    const task = new Task({...data});
    return tasksRepo.addTask(task);
};

/**
 * Update a Task by a given id with a given data.
 * @param {string} id - Task id.
 * @param {Object} data - all the needed params to update a Task.
 * @returns {Promise<Object|boolean>} Task object or false in case of id absence.
 */
const updateTask = (id, data) => {
    const task = new Task({...data});
    return tasksRepo.updateTask(id, task);
};

/**
 * Delete a task by a given id.
 * @param {string} id - Task id.
 */
const deleteTask = (id) => tasksRepo.deleteTask(id);

/**
 * Delete all Tasks by a given Board id.
 * @param {string} boardId - Board id.
 */
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

/**
 * Unassign a Task with a given id from all Tasks.
 * @param {string} userId
 * @returns {Promise<boolean>} True if unassigned, false otherwise.
 */
const unassignUser = async (userId) => tasksRepo.unassignUser(userId);

module.exports = {getAll, getById, addTask, updateTask, deleteTask, deleteTasksByBoardId, unassignUser};
