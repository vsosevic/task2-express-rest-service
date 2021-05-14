const TASKS = [];

const getAll = async () => TASKS;// .find(task => task.boardId === boardId);
// const getAll = async (boardId) => {
//     if (boardId) {
//         return TASKS.find(task => task.boardId === boardId)
//     }
//     return TASKS;
// };
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
        task.userId = null;
        return true;
    }
    return false;
});
const deleteTask = async (id) => TASKS.filter(async (task, idx) => {
    if (task.id === id) {
        // console.log('deleted', task.boardId);
        // console.log('task id', task.id);
        // console.log('really deleted', id)
        // await TASKS.splice(idx, 1);
        await TASKS.splice(idx, 1);
        // console.log(TASKS)
    }
});

module.exports = {getAll, getById, addTask, updateTask, deleteTask, unassignUser};
