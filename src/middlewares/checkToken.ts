import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';

function checkToken(req: Request, res: Response, next: NextFunction) {
    if (req.url === '/login' || req.url === '/doc' || req.url === '/') {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (authHeader !== undefined) {
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Wrong auth scheme');
        }
        jwt.verify(token, String(JWT_SECRET_KEY));
        return next();
    }
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
}

export { checkToken }