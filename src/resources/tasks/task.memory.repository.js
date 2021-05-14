const TASKS = [];

const getAll = async () => TASKS;
const getById = async (id) => TASKS.find(task => task.id === id);
const addTask = async (task) => TASKS.push(task);
const updateTask = async (id, task) => {
    let foundIndex = TASKS.findIndex(x => x.id === id);
    if (foundIndex) {
        task.id = id;
        TASKS[foundIndex] = task;
    }
};
const deleteTask = async (id) => TASKS.filter((task, idx) => {
    if (task.id === id) {
        TASKS.splice(idx, 1);
    }
});

module.exports = {getAll, getById, addTask, updateTask, deleteTask};
