const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const addBoard = (board) => boardsRepo.addBoard(board);
const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);
const deleteBoard = async (id) => {
     await boardsRepo.deleteBoard(id).then(() => {
        tasksService.deleteTasksByBoardId(id);
    }).catch(err => {
        console.error('Smth went wrong with board deletion', err);
    });

};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
