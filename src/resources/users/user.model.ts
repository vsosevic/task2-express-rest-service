import { v4 as uuid } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

interface IUser {
  id: string,
  name: string,
  login: string,
  password: string
}

/**
 * User class.
 */
@Entity()
class User implements IUser{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  name: string;

  @Column()
  password: string;

  /**
   * User constructor.
   * @param {string} id - instance id.
   * @param {string} name - user name.
   * @param {string} login - user login.
   * @param {string} password - user password.
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Takes a User object and returns only needed fields.
   * @param {Object} user - user instance.
   * @returns {{name, id, login}}
   * @static
   */
  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User, IUser};
