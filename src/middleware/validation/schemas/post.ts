import { z } from 'zod';

export const CreateStatusPostSchema = z.object({
	post: z.string({ required_error: 'status post is required' }),
});
