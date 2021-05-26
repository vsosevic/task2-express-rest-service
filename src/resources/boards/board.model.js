const uuid = require('uuid').v4;
const Column = require('./board.column.model');

/**
 * Board class.
 */
class Board {
  /**
   * Board constructor.
   * @param {string} id
   * @param {string} title
   * @param {Array} columns
   */
  constructor({
    id = uuid(),
    title,
    columns
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(
        (item) =>
            new Column({ id: item.id, title: item.title, order: item.order })
    );
  }

  /**
   * Takes a Board object and returns only needed fields.
   * @param {Object} board
   * @returns {{id, title, columns}}
   * @static
   */
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
