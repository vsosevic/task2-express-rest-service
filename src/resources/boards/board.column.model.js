const uuid = require('uuid').v4;

/**
 * Column class.
 */
class Column {
  /**
   * Column constructor.
   * @param {string} id - instance id.
   * @param {string} title - column title.
   * @param {number} order - column order.
   */
  constructor({ id = uuid(), title = '', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
