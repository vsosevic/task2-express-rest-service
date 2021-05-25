const uuid = require('uuid').v4;

class Task {
  constructor({
    id = uuid(),
    title = 'Task title',
    order = 1,
    description = 'Description',
    userId = '1', // assignee
    boardId = '1',
    columnId = '1'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId ,boardId, columnId } = task;
    return { id, title, order, description, userId ,boardId, columnId };
  }
}

module.exports = Task;
