import { NextFunction, Request, Response } from 'express';

interface AppError extends Error {
    status?: number;
}

export const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'An error has occured' });
};