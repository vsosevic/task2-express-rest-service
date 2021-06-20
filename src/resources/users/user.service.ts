import * as usersRepo from './user.db';
import { User, IUser } from './user.model';
import * as tasksService from '../tasks/task.service';

/**
 * Return all users.
 * @returns {Promise<Array>} Array of user objects.
 */
const getAll = () => usersRepo.getAll();

/**
 * Get User by id.
 * @param {string} id - user id.
 * @returns {Promise<User>} User object.
 */
const getById = (id: string) => usersRepo.getById(id);

/**
 * Add a User to memory repository.
 * @param {IUser} data - object complies with IUser interface.
 * @returns {Promise<Object>} User object.
 */
const addUser = (data: IUser) => {
    const user = new User({...data});
    return usersRepo.addUser(user);
}

/**
 * Update a User by a given id with a given data.
 * @param {string} id - User id.
 * @param {IUser} data - object complies with IUser interface.
 * @returns {Promise<Object|boolean>} User object or false in case of id absence.
 */
const updateUser = (id: string, data: IUser) => {
    const user = new User({...data});
    return usersRepo.updateUser(id, user);
};

/**
 * Delete a user by a given id.
 * @param {string} id - User id.
 */
const deleteUser = (id: string) => {
    usersRepo.deleteUser(id).then(() => {
        tasksService.unassignUser(id);
    });
};

export {getAll, getById, addUser, updateUser, deleteUser};