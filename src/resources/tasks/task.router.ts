import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import express, {Request, Response, NextFunction } from 'express';
import { Task } from "./task.model";
import * as tasksService from './task.service';

const router = express.Router({mergeParams: true});

router.route('/').get(async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await tasksService.getAll();
        if (tasks) {
            return res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return next(err);
    }
});

router.route('/:id').get(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const task = await tasksService.getById(String(id));
        if (task) {
            return res.json(Task.toResponse(task));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return next(err);
    }
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {boardId} = req.params;
        boardId = String(boardId);
        const {title, order, description, userId, columnId} = req.body
        const taskObj = new Task({title, order, description, boardId, columnId, userId});
        const task = await tasksService.addTask(taskObj);
        return res.status(StatusCodes.CREATED).json(Task.toResponse(task));
    } catch (err) {
        return next(err);
    }
});

router.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const task = await tasksService.updateTask(String(id), req.body);
        if (task) {
            return res.status(StatusCodes.OK).json(Task.toResponse(task));
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return next(err);
    }
});

router.route('/:id').delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const task = await tasksService.getById(String(id));
        if (task) {
            await tasksService.deleteTask(String(task.id));
            return res.status(StatusCodes.NO_CONTENT).json();
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return next(err);
    }
});

export {router};
