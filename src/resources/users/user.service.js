const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const addUser = (data) => {
    const user = new User({...data});
    return usersRepo.addUser(user);
}
const updateUser = (id, data) => {
    const user = new User({...data});
    return usersRepo.updateUser(id, user)
};
const deleteUser = (id) => {
    usersRepo.deleteUser(id).then(() => {
        tasksService.unassignUser(id);
    });
};

module.exports = {getAll, getById, addUser, updateUser, deleteUser};
