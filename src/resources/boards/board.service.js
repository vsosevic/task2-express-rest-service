const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

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
const getById = (id) => boardsRepo.getById(id);

/**
 * Add a Board to memory repository.
 * @param {Object} data - all the needed params to create a Board.
 * @returns {Promise<Object>} Board object.
 */
const addBoard = (data) => {
    const board = new Board({...data});
    return boardsRepo.addBoard(board);
};

/**
 * Update a Board by a given id with a given data.
 * @param {string} id - Board id.
 * @param {Object} data - all the needed params to update a Board.
 * @returns {Promise<Object|boolean>} Board object or false in case of id absence.
 */
const updateBoard = (id, data) => {
    const board = new Board({...data});
    return boardsRepo.updateBoard(id, board);
};

/**
 * Delete a board by a given id.
 * @param {string} id - Board id.
 */
const deleteBoard = async (id) => {
    await boardsRepo.deleteBoard(id).then(() => {
        tasksService.deleteTasksByBoardId(id);
    }).catch(err => {
        console.error('Smth went wrong with board deletion', err);
    });

};

module.exports = {getAll, getById, addBoard, updateBoard, deleteBoard};
