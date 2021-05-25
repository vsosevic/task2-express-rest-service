const uuid = require('uuid').v4;

class Board {
  constructor({
    id = uuid(),
    title = 'Board title',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
