const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const addBoard = (board) => boardsRepo.addBoard(board);
const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);
const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
