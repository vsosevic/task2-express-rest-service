import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { logger } from "./logger/logger";

export default function errorHandler (err: Error, _req: Request, res: Response, _next: NextFunction) {
    logger.error(err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({
        message: err.message,
        status: ReasonPhrases.INTERNAL_SERVER_ERROR
    });
}