import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import express, {Request, Response, NextFunction } from 'express';
import * as usersService from './user.service';
import { User } from "./user.model";

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await usersService.getAll();
        next();
        return res.status(StatusCodes.OK).json(users.map(User.toResponse));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').get(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const user = await usersService.getById(String(id));
        if (user) {
            next();
            return res.status(StatusCodes.OK).json(User.toResponse(user));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await usersService.addUser(req.body);
        next();
        return res.status(StatusCodes.CREATED).json(User.toResponse(user));
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const user = await usersService.updateUser(String(id), req.body);
        if (user) {
            next();
            return res.status(StatusCodes.OK).json(User.toResponse(user));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.route('/:id').delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const user = await usersService.getById(String(id));
        if (user) {
            await usersService.deleteUser(user.id);
            next();
            return res.status(StatusCodes.NO_CONTENT).json();
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

export {router};
