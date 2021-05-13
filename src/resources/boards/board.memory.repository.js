const BOARDS = [
  // {
  //   "id": "1",
  //   "title": "Title1",
  //   "columns": "Columns1"
  // },
  // {
  //   "id": "2",
  //   "title": "Title2",
  //   "columns": "Columns2"
  // }
];

const getAll = async () => BOARDS;
const getById = async (id) => BOARDS.find(board => board.id === id);
const addBoard = async (board) => BOARDS.push(board);
const updateBoard = async (id, board) => {
  let foundIndex = BOARDS.findIndex(x => x.id === id);
  if (foundIndex) {
    board.id = id;
    BOARDS[foundIndex] = board;
  }
};
const deleteBoard = async (id) => {
  const index = BOARDS.indexOf(id);
  if (index > -1) {
    BOARDS.splice(index, 1);
  }
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
