import { v4 as uuid } from 'uuid';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface ITask {
  id?: string,
  title: string,
  order: number,
  description: string,
  boardId: string,
  columnId: string,
  userId: string,
}

/**
 * Task class.
 */
@Entity()
class Task implements ITask {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column()
  boardId: string;

  @Column({nullable: true})
  columnId: string;

  @Column({nullable: true})
  userId: string;

  /**
   * Task constructor.
   * @param {string} id - instance id.
   * @param {string} title - task title.
   * @param {number} order - task order.
   * @param {string} description - task description.
   * @param {string} boardId - task's board id.
   * @param {string} columnId - tasks's column id.
   * @param {string} userId - task owner's user id.
   */
  constructor({
    id = uuid(),
    title = 'Task title',
    order = 1,
    description = 'Description',
    boardId = '',
    columnId = '',
    userId = '' // assignee
              } = {} as ITask) {
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
  static toResponse(task: ITask) {
    const { id, title, order, description, userId ,boardId, columnId } = task;
    return { id, title, order, description, userId ,boardId, columnId };
  }
}

export { Task, ITask };
