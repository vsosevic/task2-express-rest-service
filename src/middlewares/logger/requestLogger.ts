import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

function requestLogger(req: Request, res: Response, next:NextFunction) {
    const queryParams = JSON.stringify(req.query);
    const url = req.hostname + req.originalUrl;
    const requestMethod = req.method;
    const body = ['POST', 'PATCH', 'PUT'].includes(requestMethod)
        ? JSON.stringify(req.body)
        : '';
    next();
    res.on("finish", () => {
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
