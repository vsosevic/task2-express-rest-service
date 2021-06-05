import { v4 as uuid } from 'uuid';

interface IColumn {
  id: string,
  title: string,
  order: number
}

/**
 * Column class.
 */
class Column implements IColumn {
  id: string;

  order: number;

  title: string;

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

export { Column, IColumn};
