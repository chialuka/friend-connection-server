import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { prisma } from '../database';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, username } = req.body;

		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ username }, { email }],
			},
		});

		if (existingUser) {
			return res.status(200).json({ user: existingUser });
		}
		const newUser = await prisma.user.create({
			data: {
				userId: uuid(),
				...(email ? { email } : { username }),
			},
		});

		return res.status(201).json({ usesr: newUser });
	} catch (error) {
		next({ message: 'Error creating user', cause: error });
	}
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params;
		const users = await prisma.user.findMany({
			where: {
				userId: {
					not: userId,
				},
			},
		});

		return res.status(200).json({ users });
	} catch (error) {
		next({ message: 'Error getting all users', cause: error });
	}
};

export const getNonFriends = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params;
		const users = await prisma.user.findMany({
			where: {
				userId: {
					not: userId,
				},
			},
		});
		const friends = await prisma.connection.findMany({
			where: {
				OR: [{ userId }, { friendId: userId }],
				status: 'active',
			},
			select: {
				friendId: true,
				userId: true,
			},
		});

		const friendRequests = await prisma.friendRequest.findMany({
			where: {
				OR: [{ senderId: userId }, { receiverId: userId }],
				NOT: [{ status: 'accepted' }],
			},
			select: {
				senderId: true,
				receiverId: true,
			},
		});

		const friendIds = friends.map((friend: (typeof friends)[0]) =>
			friend.userId === userId ? friend.friendId : friend.userId,
		);
		const friendRequestIds = friendRequests.map((request: (typeof friendRequests)[0]) =>
			request.receiverId === userId ? request.senderId : request.receiverId,
		);
		const members = users
			.filter((user: (typeof users)[0]) => !friendIds.includes(user.userId))
			.filter((user: (typeof users)[0]) => !friendRequestIds.includes(user.userId));

		return res.status(200).json({ members });
	} catch (error) {
		next({ message: 'Error getting all users', cause: error });
	}
};
