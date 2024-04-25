import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { prisma } from '../database';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, username } = req.body;
		const newUser = await prisma.user.create({
			data: {
				userId: uuid(),
				...(email ? { email } : { username }),
			},
		});

		return res.status(201).json({ newUser });
	} catch (error) {
		next({ message: 'Error creating user', cause: error });
	}
};
