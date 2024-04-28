import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { prisma } from '../database';

export const createStatusPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params;
		const { post } = req.body;
		console.log(userId, post, 'fire at will');

		const newPost = await prisma.post.create({
			data: {
				postId: uuid(),
				post,
				likes: 0,
				userId,
			},
			include: {
				user: true,
			},
		});

		return res.status(201).json({ newPost });
	} catch (error) {
		next({ message: 'Error updating user status', cause: error });
	}
};

export const getStatusPostsForUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params;

		const friends = await prisma.connection.findMany({
			where: {
				OR: [{ userId }, { friendId: userId }],
				status: 'active',
			},
			select: {
				userId: true,
				friendId: true,
				user: true,
			},
		});

		const ids: Array<string> = [
			...new Set(friends.flatMap((connection: (typeof friends)[0]) => [connection.friendId, connection.userId])),
		];

		const allStatuses = await Promise.all(
			ids.map((id: string) => prisma.post.findMany({ where: { userId: id }, include: { user: true } })),
		);
		const statusUpdates = allStatuses.filter((item) => item.length).flat();
		res.status(200).json({ statusUpdates });
	} catch (error) {
		next({ message: 'Error getting status updates for user', cause: error });
	}
};
