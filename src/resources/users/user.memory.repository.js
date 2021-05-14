const USERS = [];

const getAll = async () => USERS;
const getById = async (id) => USERS.find(user => user.id === id);
const addUser = async (user) => USERS.push(user);
const updateUser = async (id, user) => {
  const foundIndex = USERS.findIndex(x => x.id === id);
  if (foundIndex >= 0) {
    user.id = id;
    USERS[foundIndex] = user;
  }
};
const deleteUser = async (id) => USERS.filter((user, idx) => {
  if (user.id === id) {
    USERS.splice(idx, 1);
  }
});

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
