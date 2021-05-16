const router = require('express').Router();
const uuid = require('uuid').v4;
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
    const {id} = req.params;
    const board = await boardsService.getById(id);
    if (board) {
        return res.json(Board.toResponse(board));
    }
    return res.status(404).send('404 Not found');
});

router.route('/').post(async (req, res) => {
    const {title, columns} = req.body
    const boardObj = {
        "id": uuid(),
        "title": title,
        "columns": columns
    };
    await boardsService.addBoard(boardObj);
    res.status(201).json(Board.toResponse(boardObj));
});

router.route('/:id').put(async (req, res) => {
    const {id} = req.params;
    const {title, columns} = req.body
    const boardObj = {
        "title": title,
        "columns": columns
    };
    await boardsService.updateBoard(id, boardObj);
    res.status(200).json(Board.toResponse(boardObj));
});

router.route('/:id').delete(async (req, res) => {
    const {id} = req.params;
    const board = await boardsService.getById(id);
    if (board) {
        await boardsService.deleteBoard(board.id);
        return res.status(204).json();
    }
    return res.status(404).send('Not found');
});

module.exports = router;
