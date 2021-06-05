import { logger } from './logger';
import { Request, Response, NextFunction } from 'express';
import { finished } from "stream";

function requestLogger(req: Request, res: Response, next:NextFunction) {
    const queryParams = JSON.stringify(req.query);
    const url = req.hostname + req.originalUrl;
    const requestMethod = req.method;
    const body = ['POST', 'PATCH', 'PUT'].includes(requestMethod)
        ? JSON.stringify(req.body)
        : '';
    next();
    finished(res, () => {
        const { statusCode } = res;
        logger.info({
            requestMethod,
            url,
            queryParams,
            body,
            statusCode
        });
    });
}

export { requestLogger };
