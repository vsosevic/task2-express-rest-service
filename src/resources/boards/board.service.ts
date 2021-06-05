import * as boardsRepo from './board.memory.repository';
import { Board, IBoard } from './board.model'
import * as tasksService from '../tasks/task.service';

/**
 * Return all boards.
 * @returns {Promise<Array>} Array of board objects.
 */
const getAll = () => boardsRepo.getAll();

/**
 * Get Board by id.
 * @param {string} id - board id.
 * @returns {Promise<Object>} Board object.
 */
const getById = (id: string) => boardsRepo.getById(id);

/**
 * Add a Board to memory repository.
 * @param {IBoard} data - object complies with IBoard interface.
 * @returns {Promise<Object>} Board object.
 */
const addBoard = (data: IBoard) => {
    const board = new Board({...data});
    return boardsRepo.addBoard(board);
};

/**
 * Update a Board by a given id with a given data.
 * @param {string} id - Board id.
 * @param {IBoard} data - object complies with IBoard interface.
 * @returns {Promise<Object|boolean>} Board object or false in case of id absence.
 */
const updateBoard = (id: string, data: IBoard) => {
    const board = new Board({...data});
    return boardsRepo.updateBoard(id, board);
};

/**
 * Delete a board by a given id.
 * @param {string} id - Board id.
 */
const deleteBoard = async (id: string) => {
    await boardsRepo.deleteBoard(id).then(() => {
        tasksService.deleteTasksByBoardId(id);
    }).catch(err => {
        console.error('Smth went wrong with board deletion', err);
    });

};

export  { getAll, getById, addBoard, updateBoard, deleteBoard };
