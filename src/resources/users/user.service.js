const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const addUser = (user) => usersRepo.addUser(user);
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
