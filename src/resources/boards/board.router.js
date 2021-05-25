const router = require('express').Router();
const {ReasonPhrases, StatusCodes} = require('http-status-codes');
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
    try {
        const boards = await boardsService.getAll();
        return res.json(boards.map(Board.toResponse));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const {id} = req.params;
        const board = await boardsService.getById(id);
        if (board) {
            return res.status(StatusCodes.OK).json(Board.toResponse(board));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/').post(async (req, res) => {
    try {
        const board = await boardsService.addBoard(req.body);
        return res.status(StatusCodes.CREATED).json(Board.toResponse(board));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').put(async (req, res) => {
    try {
        const {id} = req.params;
        const board = await boardsService.updateBoard(id, req.body);
        return res.status(200).json(Board.toResponse(board));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        const {id} = req.params;
        const board = await boardsService.getById(id);
        if (board) {
            await boardsService.deleteBoard(board.id);
            return res.status(StatusCodes.NO_CONTENT).json();
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

module.exports = router;
