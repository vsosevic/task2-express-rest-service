const BOARDS = [];

/**
 * Return all boards.
 * @async
 * @returns {Promise<Array>} Array of board objects.
 */
const getAll = async () => BOARDS;

/**
 * Get Board by id.
 * @async
 * @param {string} id - board id.
 * @returns {Promise<Object>} Board object.
 */
const getById = async (id) => BOARDS.find(board => board.id === id);

/**
 * Add a Board to memory repository.
 * @async
 * @param {Object} board - instance of a Board class.
 * @returns {Promise<Object>} Board instance.
 */
const addBoard = async (board) => {
    BOARDS.push(board);
    return board;
};

/**
 * Update a Board by a given id with a given data.
 * @async
 * @param {string} id - Board id.
 * @param {Object} board - instance of a Board class.
 * @returns {Promise<Object|boolean>} Board object or false in case of id absence.
 */
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

/**
 * Delete a Board by a given id.
 * @async
 * @param {string} id - Board id.
 */
const deleteBoard = async (id) => BOARDS.filter((board, idx) => {
    if (board.id === id) {
        BOARDS.splice(idx, 1);
        return true;
    }
    return false;
});

module.exports = {getAll, getById, addBoard, updateBoard, deleteBoard};
