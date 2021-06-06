import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import express, { Request, Response, NextFunction } from 'express';
import asyncHandler from "express-async-handler";
import * as usersService from './user.service';
import { User } from "./user.model";

const router = express.Router();

router.route('/').get(asyncHandler(async (_req: Request, res: Response, next: NextFunction) => {
    const users = await usersService.getAll();
    // throw new Error("Oops!");
    next();
    return res.status(StatusCodes.OK).json(users.map(User.toResponse));
}));

router.route('/:id').get(asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const user = await usersService.getById(String(id));
    if (user) {
        next();
        return res.status(StatusCodes.OK).json(User.toResponse(user));
    }
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
}));

router.route('/').post(asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersService.addUser(req.body);
    next();
    return res.status(StatusCodes.CREATED).json(User.toResponse(user));
}));

router.route('/:id').put(asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const user = await usersService.updateUser(String(id), req.body);
    next();
    if (user) {
        return res.status(StatusCodes.OK).json(User.toResponse(user));
    }
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
}));

router.route('/:id').delete(asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const user = await usersService.getById(String(id));
    next();
    if (user) {
        usersService.deleteUser(user.id);
        return res.status(StatusCodes.NO_CONTENT).json();
    }
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
}));

export { router };
