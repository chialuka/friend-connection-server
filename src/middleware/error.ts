import { NextFunction, Request, Response } from 'express';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) {
		return next(error);
	}
	res.status(500).json({ error: 'Internal server error' });
};
