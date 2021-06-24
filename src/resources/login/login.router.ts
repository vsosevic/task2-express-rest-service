import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import express, { Request, Response } from 'express';
import asyncHandler from "express-async-handler";
import { JWT_SECRET_KEY } from '../../common/config';
import jwt from 'jsonwebtoken';
import { authenticateUser } from "./login.service";

const loginRouter = express.Router();

loginRouter.route('/login').post(asyncHandler(async (req: Request, res: Response) => {
    const user = req.body;
    const realUser = await authenticateUser(user);
    if (realUser) {
        const payload = { userId: realUser.id, login: realUser.login };
        const jwtToken = jwt.sign(payload, String(JWT_SECRET_KEY));
        return res.status(StatusCodes.OK).json({token: jwtToken});
    }
    return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
}));

export { loginRouter };
