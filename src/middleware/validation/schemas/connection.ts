import { z } from 'zod';

export const ChangeConnectionStatusSchema = z.object({
	userId: z.string({ required_error: 'userId is required' }).uuid(),
	friendId: z.string({ required_error: 'friendId is required' }).uuid(),
	status: z.enum(['active', 'blocked']),
});
