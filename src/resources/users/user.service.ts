const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');
const User = require('./user.model');

/**
 * Return all users.
 * @returns {Promise<Array>} Array of user objects.
 */
const getAll = () => usersRepo.getAll();

/**
 * Get User by id.
 * @param {string} id - user id.
 * @returns {Promise<Object>} User object.
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Add a User to memory repository.
 * @param {Object} data - all the needed params to create a User.
 * @returns {Promise<Object>} User object.
 */
const addUser = (data) => {
    const user = new User({...data});
    return usersRepo.addUser(user);
}

/**
 * Update a User by a given id with a given data.
 * @param {string} id - User id.
 * @param {Object} data - all the needed params to update a User.
 * @returns {Promise<Object|boolean>} User object or false in case of id absence.
 */
const updateUser = (id, data) => {
    const user = new User({...data});
    return usersRepo.updateUser(id, user);
};

/**
 * Delete a user by a given id.
 * @param {string} id - User id.
 */
const deleteUser = (id) => {
    usersRepo.deleteUser(id).then(() => {
        tasksService.unassignUser(id);
    });
};

module.exports = {getAll, getById, addUser, updateUser, deleteUser};
