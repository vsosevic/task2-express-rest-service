const uuid = require('uuid').v4;
const Column = require('./board.column.model');

class Board {
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

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
