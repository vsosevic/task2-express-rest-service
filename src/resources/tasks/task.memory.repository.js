let TASKS = [];

const getAll = async () => TASKS;
const getById = async (id) => TASKS.find(task => task.id === id);
const addTask = async (task) => TASKS.push(task);
const updateTask = async (id, task) => {
    const foundIndex = TASKS.findIndex(x => x.id === id);
    if (foundIndex) {
        const taskTmp = task;
        taskTmp.id = id;
        TASKS[foundIndex] = taskTmp;
    }
};
const unassignUser = async (userId) => TASKS.filter(task => {
    if (task.userId === userId) {
        const taskTmp = task;
        taskTmp.userId = null;
        return true;
    }
    return false;
});
const deleteTask = async (id) => {
    TASKS = TASKS.filter(task => task.id !== id)
};

module.exports = {getAll, getById, addTask, updateTask, deleteTask, unassignUser};
