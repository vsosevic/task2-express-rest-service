import { getManager } from "typeorm";
import {IBoard, Board} from "./board.model";

/**
 * Return all boards.
 * @async
 * @returns {Promise<Array>} Array of board objects.
 */
const getAll = async () => {
    const boardRepository = getManager().getRepository(Board);
    return boardRepository.find();
};

/**
 * Get Board by id.
 * @async
 * @param {string} id - board id.
 * @returns {Promise<Object>} Board object.
 */
const getById = async (id: string) => {
    const boardRepository = getManager().getRepository(Board);
    return boardRepository.findOne({id});
};

/**
 * Add a Board to DB.
 * @async
 * @param {IBoard} board - instance of a Board class.
 * @returns {Promise<Board>} Board instance.
 */
const addBoard = async (board: IBoard) => {
    const boardRepository = getManager().getRepository(Board);
    const createdBoard = await boardRepository.create(board);
    return boardRepository.save(createdBoard);
};

/**
 * Update a Board by a given id with a given data.
 * @async
 * @param {string} id - Board id.
 * @param {IBoard} board - instance of a Board class.
 * @returns {Promise<Object|boolean>} Board object or false in case of id absence.
 */
const updateBoard = async (id: string, board: IBoard) => {
    const boardRepository = getManager().getRepository(Board);
    const foundBoard = await boardRepository.findOne({id});
    if (foundBoard) {
        return boardRepository.save({...foundBoard, ...board});
    }
    return false;
};

/**
 * Delete a Board by a given id.
 * @async
 * @param {string} id - Board id.
 */
const deleteBoard = async (id: string) => {
    const boardRepository = getManager().getRepository(Board);
    await boardRepository.delete({id});
    return true;
};

export { getAll, getById, addBoard, updateBoard, deleteBoard };
