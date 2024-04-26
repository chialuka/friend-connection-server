import { z } from 'zod';

export const UserIdSchema = z.object({
	userId: z.string({ required_error: 'userId is required' }).uuid(),
});
