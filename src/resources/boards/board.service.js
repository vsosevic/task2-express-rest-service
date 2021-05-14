const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const addBoard = (board) => boardsRepo.addBoard(board);
const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);
const deleteBoard = async (id) => {
    await tasksService.deleteTasksByBoardId(id);
     await boardsRepo.deleteBoard(id).then(() => {
        // tasksService.deleteTasksByBoardId(id);
    }).catch(err => {
        console.log('Smth went wrong with board deletion');
    });

};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
