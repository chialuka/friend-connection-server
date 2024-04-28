import { Router } from 'express';
import { getUserConnections } from '../controllers/connections';
import { validateRequestSchema } from '../middleware/validation';
import { UserIdSchema } from '../middleware/validation/schemas/common';
import { updateFriendRequestStatus } from '../controllers/friend-request';
import { ChangeConnectionStatusSchema } from '../middleware/validation/schemas/connection';

const router = Router();

router.get('/:userId', validateRequestSchema({ schema: UserIdSchema, type: 'params' }), getUserConnections);

router.patch(
	'/status',
	validateRequestSchema({ schema: ChangeConnectionStatusSchema, type: 'body' }),
	updateFriendRequestStatus,
);

export default router;
