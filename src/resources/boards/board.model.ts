import { v4 as uuid } from 'uuid';
import { Column, IColumn } from "./board.column.model";

interface IBoard {
  id: string,
  title: string,
  columns: Array<IColumn>
}

/**
 * Board class.
 */
class Board implements IBoard{
  id: string;

  title: string;

  columns: Array<IColumn>;

  /**
   * Board constructor.
   * @param {string} id - instance id.
   * @param {string} title - board title.
   * @param {Array<IColumn>} columns - board columns.
   */
  constructor({
    id = uuid(),
    title = '',
    columns = new Array<IColumn>()
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(
        (item: IColumn) =>
            new Column({ id: item.id, title: item.title, order: item.order })
    );
  }

  /**
   * Takes a Board object and returns only needed fields.
   * @param {IBoard} board - Board instance.
   * @returns {{id, title, columns}}
   * @static
   */
  static toResponse(board: IBoard) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

}

export { Board, IBoard};
