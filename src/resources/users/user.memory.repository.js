const USERS = [
  {
    "id": "1",
    "name": "Andy",
    "login": "andy.a@test.com",
    "password": ""
  },
  {
    "id": "2",
    "name": "Andy2",
    "login": "andy2.a@test.com",
    "password": ""
  }
];

const getAll = async () => USERS;
const getById = async (id) => USERS.find(user => user.id === id);

module.exports = { getAll, getById };
