import { Router } from 'express';

import { validateRequestSchema } from '../middleware/validation';
import { UserIdSchema } from '../middleware/validation/schemas/common';
import { CreateStatusSchema } from '../middleware/validation/schemas/post';
import { createStatusPost } from '../controllers/posts';

const router = Router();

router.post(
	'/',
	validateRequestSchema({ schema: UserIdSchema, type: 'params' }),
	validateRequestSchema({ schema: CreateStatusSchema, type: 'body' }),
	createStatusPost,
);
