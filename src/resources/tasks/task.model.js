const uuid = require('uuid').v4;

/**
 * Task class.
 */
class Task {
  /**
   * Task constructor.
   * @param {string} id - instance id.
   * @param {string} title - task title.
   * @param {number} order - task order.
   * @param {string} description - task description.
   * @param {string} userId - task owner's user id.
   * @param {string} boardId - task's board id.
   * @param {string} columnId - tasks's column id.
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
   * @param {Object} task - task instance.
   * @returns {{id, title, order, description, userId ,boardId, columnId}}
   * @static
   */
  static toResponse(task) {
    const { id, title, order, description, userId ,boardId, columnId } = task;
    return { id, title, order, description, userId ,boardId, columnId };
  }
}

module.exports = Task;
