const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const addBoard = (data) => {
    const board = new Board({...data});
    return boardsRepo.addBoard(board);
};
const updateBoard = (id, data) => {
    const board = new Board({...data})
    return boardsRepo.updateBoard(id, board);
};
const deleteBoard = async (id) => {
     await boardsRepo.deleteBoard(id).then(() => {
        tasksService.deleteTasksByBoardId(id);
    }).catch(err => {
        console.error('Smth went wrong with board deletion', err);
    });

};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
