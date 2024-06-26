import { z } from 'zod';

export const FriendRequestSchema = z.object({
	senderId: z.string({ required_error: 'senderId is required' }).uuid(),
	receiverId: z.string({ required_error: 'receiverId is required' }).uuid(),
});

export const FriendRequestResponseSchema = z.object({
	senderId: z.string({ required_error: 'senderId is required' }).uuid(),
	receiverId: z.string({ required_error: 'receiverId is required' }).uuid(),
	status: z.enum(['accepted', 'rejected']),
});
