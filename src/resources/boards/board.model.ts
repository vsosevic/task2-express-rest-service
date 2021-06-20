import { v4 as uuid } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


interface IBoard {
  id: string,
  title: string,
  columns: string
}

/**
 * Board class.
 */
@Entity()
class Board implements IBoard{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({type: "json", nullable: true})
  columns: string;

  /**
   * Board constructor.
   * @param {string} id - instance id.
   * @param {string} title - board title.
   * @param {Array<IColumn>} columns - board columns.
   */
  constructor({
    id = uuid(),
    title = '',
    columns = ''
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
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
