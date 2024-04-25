import { z } from 'zod';

export const UserSchema = z.object({
	username: z.string().min(6).max(50).optional(),
	email: z.string().email().optional(),
});

export const CreateUserSchema = UserSchema.extend({
	username: z.string().min(6).max(50).optional(),
	email: z.string().email().optional(),
}).refine(
	(data) => {
		if (!data.username && !data.email) {
			return false;
		}
		return true;
	},
	{
		message: "'username' or 'email' is required",
	},
);
