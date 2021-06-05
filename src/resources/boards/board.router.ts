import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import express, {Request, Response, NextFunction } from 'express';
import { Board } from "./board.model";
import * as boardsService from './board.service'

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const boards = await boardsService.getAll();
        next();
        return res.json(boards.map(Board.toResponse));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').get(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const board = await boardsService.getById(String(id));
        if (board) {
            next();
            return res.status(StatusCodes.OK).json(Board.toResponse(board));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const board = await boardsService.addBoard(req.body);
        next();
        return res.status(StatusCodes.CREATED).json(Board.toResponse(board));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const board = await boardsService.updateBoard(String(id), req.body);
        if (board) {
            next();
            return res.status(200).json(Board.toResponse(board));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const board = await boardsService.getById(String(id));
        if (board) {
            await boardsService.deleteBoard(board.id);
            next();
            return res.status(StatusCodes.NO_CONTENT).json();
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

export {router};
