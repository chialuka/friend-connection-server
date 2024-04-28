import { Router } from 'express';

import { validateRequestSchema } from '../middleware/validation';
import { UserIdSchema } from '../middleware/validation/schemas/common';
import { CreateStatusPostSchema } from '../middleware/validation/schemas/post';
import { createStatusPost, getStatusPostsForUser } from '../controllers/posts';

const router = Router();

router.post(
	'/:userId',
	validateRequestSchema({ schema: UserIdSchema, type: 'params' }),
	validateRequestSchema({ schema: CreateStatusPostSchema, type: 'body' }),
	createStatusPost,
);

router.get('/:userId', validateRequestSchema({ schema: UserIdSchema, type: 'params' }), getStatusPostsForUser);

export default router;
