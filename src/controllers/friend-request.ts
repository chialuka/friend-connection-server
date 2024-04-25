import { NextFunction, Request, Response } from 'express';

import { prisma } from '../database';

export const createFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { senderId, receiverId } = req.body;
		const [sender, receiver] = await Promise.all(
			[senderId, receiverId].map((userId) => prisma.user.findFirst({ where: { userId } })),
		);

		if (!sender || !receiver) {
			return res.status(400).json({ error: 'senderId or receiverId does not exist' });
		}
		const newRequest = await prisma.friendRequest.create({
			data: {
				senderId,
				receiverId,
			},
		});

		return res.status(201).json({ newRequest });
	} catch (error) {
		next({ message: 'Error creating friend request', cause: error });
	}
};
