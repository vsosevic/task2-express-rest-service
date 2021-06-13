import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import express, { Request, Response } from 'express';
import asyncHandler from "express-async-handler";
import * as usersService from './user.service';
import { User } from "./user.model";

const router = express.Router();

router.route('/').get(asyncHandler(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();
    // throw new Error("Oops!");
    return res.status(StatusCodes.OK).json(users.map(User.toResponse));
}));

// For test purpose to check docker container restarting. Url to access this route is - /users/crash
router.route('/crash').get(asyncHandler(async (_req: Request, _res: Response) => {
    process.exit(1);
}));

router.route('/:id').get(asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await usersService.getById(String(id));
    if (user) {
        return res.status(StatusCodes.OK).json(User.toResponse(user));
    }
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
}));

router.route('/').post(asyncHandler(async (req: Request, res: Response) => {
    const user = await usersService.addUser(req.body);
    return res.status(StatusCodes.CREATED).json(User.toResponse(user));
}));

router.route('/:id').put(asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await usersService.updateUser(String(id), req.body);
    if (user) {
        return res.status(StatusCodes.OK).json(User.toResponse(user));
    }
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
}));

router.route('/:id').delete(asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await usersService.getById(String(id));
    if (user) {
        usersService.deleteUser(user.id);
        return res.status(StatusCodes.NO_CONTENT).json();
    }
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
}));

export { router };
