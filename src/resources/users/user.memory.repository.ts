import { IUser } from "./user.model";

const USERS: IUser[] = [];

/**
 * Returns all Users.
 * @async
 * @returns {Promise<Array>} Array of user objects.
 */
const getAll = async () => USERS;

/**
 * Get User by Id.
 * @async
 * @param {string} id - user id.
 * @returns {Promise<Object>} User object.
 */
const getById = async (id: string) => USERS.find(user => user.id === id);

/**
 * Add a User to memory repository.
 * @param {IUser} user - instance of a User class.
 * @returns {Promise<Object>} User object.
 */
const addUser = async (user: IUser) => {
  USERS.push(user);
  return user;
};

/**
 * Update a User by a given id with a given data.
 * @async
 * @param {string} id - User id.
 * @param {IUser} user - object complies with IUser interface.
 * @returns {Promise<Object|boolean>} User object or false in case of id absence.
 */
const updateUser = async (id: string, user: IUser) => {
  const foundIndex = USERS.findIndex(x => x.id === id);
  if (foundIndex >= 0) {
    const userTmp = user;
    userTmp.id = id;
    USERS[foundIndex] = userTmp;
    return userTmp;
  }
  return false;
};

/**
 * Delete a User by a given id.
 * @async
 * @param {string} id - User id.
 */
const deleteUser = async (id: string) => USERS.map((user, idx) => {
  if (user.id === id) {
    USERS.splice(idx, 1);
    return true;
  }
  return false;
});

export { getAll, getById, addUser, updateUser, deleteUser };
