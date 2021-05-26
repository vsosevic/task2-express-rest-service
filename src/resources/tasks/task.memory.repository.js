let TASKS = [];

/**
 * Return all tasks.
 * @async
 * @returns {Promise<Array>} Array of task objects.
 */
const getAll = async () => TASKS;

/**
 * Get Task by id.
 * @async
 * @param {string} id - task id.
 * @returns {Promise<Object>} Task object.
 */
const getById = async (id) => TASKS.find(task => task.id === id);

/**
 * Add a Task to memory repository.
 * @async
 * @param {Object} task - instance of a Task class.
 * @returns {Promise<Object>} Task object.
 */
const addTask = async (task) => {
    TASKS.push(task);
    return task;
};

/**
 * Update a Task by a given id with a given data.
 * @async
 * @param {string} id - Task id.
 * @param {Object} task - instance of a Task class.
 * @returns {Promise<Object|boolean>} Task object or false in case of id absence.
 */
const updateTask = async (id, task) => {
    const foundIndex = TASKS.findIndex(x => x.id === id);
    if (foundIndex >= 0) {
        const taskTmp = task;
        taskTmp.id = id;
        TASKS[foundIndex] = taskTmp;
        return taskTmp;
    }
    return false;
};

/**
 * Delete a Task by a given id.
 * @async
 * @param {string} id - Task id.
 */
const deleteTask = async (id) => {
    TASKS = TASKS.filter(task => task.id !== id)
};

/**
 * Unassign a Task with a given id from all Tasks.
 * @async
 * @param {string} userId
 * @returns {Promise<boolean>} True if unassigned, false otherwise.
 */
const unassignUser = async (userId) => TASKS.filter(task => {
    if (task.userId === userId) {
        const taskTmp = task;
        taskTmp.userId = null;
        return true;
    }
    return false;
});

module.exports = {getAll, getById, addTask, updateTask, deleteTask, unassignUser};
