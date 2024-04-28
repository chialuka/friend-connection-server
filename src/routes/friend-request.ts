import { Router } from 'express';

import { validateRequestSchema } from '../middleware/validation';
import { FriendRequestResponseSchema, FriendRequestSchema } from '../middleware/validation/schemas/friend-request';
import { createFriendRequest, getFriendRequests, updateFriendRequestStatus } from '../controllers/friend-request';
import { UserIdSchema } from '../middleware/validation/schemas/common';

const router = Router();

router.post('/', validateRequestSchema({ schema: FriendRequestSchema, type: 'body' }), createFriendRequest);

router.patch(
	'/status',
	validateRequestSchema({ schema: FriendRequestResponseSchema, type: 'body' }),
	updateFriendRequestStatus,
);

router.get('/:userId', validateRequestSchema({ schema: UserIdSchema, type: 'params' }), getFriendRequests);

export default router;
