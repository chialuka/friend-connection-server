import { NextFunction, Request, Response } from 'express';

import { prisma } from '../database';

export const getUserConnections = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params;

		const allConnections = await prisma.connection.findMany({
			where: {
				OR: [{ userId }, { friendId: userId }],
				status: 'active',
			},
			select: {
				user: {
					select: {
						userId: true,
						username: true,
						email: true,
						createdAt: true,
					},
				},
				friend: {
					select: {
						userId: true,
						username: true,
						email: true,
						createdAt: true,
					},
				},
				createdAt: true,
				status: true,
			},
		});

		const connections = allConnections.reduce(
			(
				prev: Array<{
					status: 'blocked' | 'active';
					joinedAt: Date;
					createdAt: Date;
					userId: string;
					username: string | null;
					email: string | null;
				}>,
				connection: (typeof allConnections)[0],
			) => {
				const { user, friend, ...rest } = connection;
				if (friend.userId === userId) {
					prev.push({ ...user, joinedAt: user.createdAt, ...rest });
				} else {
					prev.push({ ...friend, joinedAt: friend.createdAt, ...rest });
				}
				return prev;
			},
			[],
		);

		return res.status(200).json({ connections });
	} catch (error) {
		next({ message: 'Error getting user connections', cause: error });
	}
};

export const changeConnectionStatus = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId, friendId, status } = req.body;

		await prisma.connection.updateMany({
			where: {
				OR: [
					{ userId, friendId },
					{ friendId: userId, userId: friendId },
				],
			},
			data: {
				status,
			},
		});
		const connection = await prisma.connection.findFirst({
			where: {
				OR: [
					{ userId, friendId },
					{ friendId: userId, userId: friendId },
				],
			},
		});

		return res.status(200).json({ connection });
	} catch (error) {
		next({ message: 'Error updating connection status', cause: error });
	}
};
