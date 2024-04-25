import { NextFunction, Request, Response } from 'express';
import zod, { ZodError } from 'zod';

export const validateRequestSchema =
	({ schema, type }: { schema: zod.Schema; type: 'body' | 'query' | 'params' }) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req[type]);
			return next();
		} catch (error) {
			if (error instanceof ZodError) {
				const formattedErrors = error.errors.map((err) => ({
					message: err.message,
				}));
				res.status(400).json({ errors: formattedErrors });
			} else {
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	};
