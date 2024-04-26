import { NextFunction, Request, Response } from 'express';

import { prisma } from '../database';

export const getUserConnections = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params;

		const connections = await prisma.connection.findMany({
			where: {
				OR: [{ userId }, { friendId: userId }],
			},
		});

		return res.status(200).json({ connections });
	} catch (error) {
		next({ message: 'Error getting user connections', cause: error });
	}
};
