import { Router } from 'express';

import { validateRequestSchema } from '../middleware/validation';
import { FriendRequestResponseSchema, FriendRequestSchema } from '../middleware/validation/schemas/friend-request';
import { createFriendRequest, updateFriendRequestStatus } from '../controllers/friend-request';

const router = Router();

router.post('/', validateRequestSchema({ schema: FriendRequestSchema, type: 'body' }), createFriendRequest);

router.patch(
	'/status',
	validateRequestSchema({ schema: FriendRequestResponseSchema, type: 'body' }),
	updateFriendRequestStatus,
);

export default router;
