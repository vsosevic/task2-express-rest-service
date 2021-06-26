import { getManager } from "typeorm";
import { IUser, User } from "./user.model";

// const USERS: IUser[] = [];

/**
 * Returns all Users.
 * @async
 * @returns {Promise<Array>} Array of user objects.
 */
const getAll = async () => {
  const userRepository = getManager().getRepository(User);
  return userRepository.find();
};

/**
 * Get User by Id.
 * @async
 * @param {string} id - user id.
 * @returns {Promise<User>} User object.
 */
const getById = async (id: string) => {
  const userRepository = getManager().getRepository(User);
  return userRepository.findOne({id});
}

/**
 * Add a User to DB.
 * @param {IUser} user - instance of a User class.
 * @returns {Promise<User>} User object.
 */
const addUser = async (user: IUser) => {
  const userRepository = getManager().getRepository(User);
  const createdUser = await userRepository.create(user);
  return userRepository.save(createdUser);
};

/**
 * Update a User by a given id with a given data.
 * @async
 * @param {string} id - User id.
 * @param {IUser} user - object complies with IUser interface.
 * @returns {Promise<Object|boolean>} User object or false in case of id absence.
 */
const updateUser = async (id: string, user: IUser) => {
  const userRepository = getManager().getRepository(User);
  const foundUser = await userRepository.findOne({id});
  if (foundUser) {
    return userRepository.save({...foundUser, ...user});
  }
  return false;
};

/**
 * Delete a User by a given id.
 * @async
 * @param {string} id - User id.
 */
const deleteUser = async (id: string) => {
  const userRepository = getManager().getRepository(User);
  await userRepository.delete({id});
  return true;
};

export { getAll, getById, addUser, updateUser, deleteUser };
