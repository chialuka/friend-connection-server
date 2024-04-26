import { z } from 'zod';

export const CreateStatusSchema = z.object({
	status: z.string({ required_error: 'status is required' }),
});
