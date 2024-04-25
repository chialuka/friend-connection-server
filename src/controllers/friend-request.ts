import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../database';
import { FriendRequestResponseSchema } from 'src/middleware/validation/schemas/friend-request';

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

export const updateFriendRequestStatus = async (
	req: Request<
		Record<string, unknown>,
		Record<string, unknown>,
		z.infer<typeof FriendRequestResponseSchema>,
		Record<string, unknown>
	>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { senderId, receiverId, status } = req.body;
		const [sender, receiver] = await Promise.all(
			[senderId, receiverId].map((userId) => prisma.user.findFirst({ where: { userId } })),
		);
		if (!sender || !receiver) {
			return res.status(400).json({ error: 'senderId or receiverId does not exist' });
		}

		const updatedStatus = await prisma.friendRequest.update({
			where: {
				senderId_receiverId: {
					senderId,
					receiverId,
				},
			},
			data: {
				status,
			},
		});

		return res.status(200).json({ updatedStatus });
	} catch (error) {
		next({ message: 'Error creating friend request', cause: error });
	}
};
