import { Router } from 'express';
import { changeConnectionStatus, getUserConnections } from '../controllers/connections';
import { validateRequestSchema } from '../middleware/validation';
import { UserIdSchema } from '../middleware/validation/schemas/common';
import { ChangeConnectionStatusSchema } from '../middleware/validation/schemas/connection';

const router = Router();

router.get('/:userId', validateRequestSchema({ schema: UserIdSchema, type: 'params' }), getUserConnections);

router.patch(
	'/status',
	validateRequestSchema({ schema: ChangeConnectionStatusSchema, type: 'body' }),
	changeConnectionStatus,
);

export default router;
