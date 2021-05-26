const uuid = require('uuid').v4;

/**
 * Task class.
 */
class Task {
  /**
   * Task constructor.
   * @param {string} id
   * @param {string} title
   * @param {number} order
   * @param {string} description
   * @param {string} userId
   * @param {string} boardId
   * @param {string} columnId
   */
  constructor({
    id = uuid(),
    title = 'Task title',
    order = 1,
    description = 'Description',
    userId = '', // assignee
    boardId = '',
    columnId = ''
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Takes a Task object and returns only needed fields.
   * @param {Object} task
   * @returns {{id, title, order, description, userId ,boardId, columnId}}
   * @static
   */
  static toResponse(task) {
    const { id, title, order, description, userId ,boardId, columnId } = task;
    return { id, title, order, description, userId ,boardId, columnId };
  }
}

module.exports = Task;
