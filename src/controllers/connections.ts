import { NextFunction, Request, Response } from 'express';

import { prisma } from '../database';

export const getUserConnections = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params;

		const connections = await prisma.connection.findMany({
			where: {
				OR: [{ userId }, { friendId: userId }],
				status: 'active',
			},
		});

		return res.status(200).json({ connections });
	} catch (error) {
		next({ message: 'Error getting user connections', cause: error });
	}
};

export const changeConnectionStatus = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId, friendId, status } = req.body;

		const connection = await prisma.connection.update({
			where: {
				userId_friendId: {
					userId,
					friendId,
				},
			},
			data: {
				status,
			},
		});

		return res.status(200).json({ connection });
	} catch (error) {
		next({ message: 'Error updating connection status', cause: error });
	}
};
