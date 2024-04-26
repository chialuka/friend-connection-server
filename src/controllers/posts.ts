import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { prisma } from '../database';

export const createStatusPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params;
		const { status } = req.body;

		const newStatus = await prisma.post.create({
			data: {
				postId: uuid(),
				post: status,
				likes: 0,
				userId,
			},
		});

		return res.status(201).json({ newStatus });
	} catch (error) {
		next({ message: 'Error updating user status', cause: error });
	}
};
