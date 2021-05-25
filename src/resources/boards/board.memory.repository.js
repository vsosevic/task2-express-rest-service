const BOARDS = [];

const getAll = async () => BOARDS;
const getById = async (id) => BOARDS.find(board => board.id === id);
const addBoard = async (board) => {
    BOARDS.push(board);
    return board;
};
const updateBoard = async (id, board) => {
    const foundIndex = BOARDS.findIndex(x => x.id === id);
    if (foundIndex) {
        const boardTmp = board;
        boardTmp.id = id;
        BOARDS[foundIndex] = boardTmp;
        return boardTmp;
    }
    return false;
};
const deleteBoard = async (id) => BOARDS.filter((board, idx) => {
    if (board.id === id) {
        BOARDS.splice(idx, 1);
        return true;
    }
    return false;
});

module.exports = {getAll, getById, addBoard, updateBoard, deleteBoard};
