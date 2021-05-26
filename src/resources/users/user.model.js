const uuid = require('uuid').v4;

/**
 * User class.
 */
class User {
  /**
   * User constructor.
   * @param {string} id
   * @param {string} name
   * @param {string} login
   * @param {string} password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Takes a User object and returns only needed fields.
   * @param {Object} user
   * @returns {{name, id, login}}
   * @static
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
