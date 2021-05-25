const USERS = [];

const getAll = async () => USERS;
const getById = async (id) => USERS.find(user => user.id === id);
const addUser = async (user) => USERS.push(user);
const updateUser = async (id, user) => {
  const foundIndex = USERS.findIndex(x => x.id === id);
  if (foundIndex >= 0) {
    const userTmp = user;
    userTmp.id = id;
    USERS[foundIndex] = userTmp;
    return true;
  }
  return false;
};
const deleteUser = async (id) => USERS.filter((user, idx) => {
  if (user.id === id) {
    USERS.splice(idx, 1);
    return true;
  }
  return false;
});

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
