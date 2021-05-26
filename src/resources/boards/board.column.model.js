const uuid = require('uuid').v4;

/**
 * Column class.
 */
class Column {
  /**
   * Column constructor.
   * @param {string} id
   * @param {string} title
   * @param {number} order
   */
  constructor({ id = uuid(), title = '', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
