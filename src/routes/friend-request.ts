import { Router } from 'express';

import { validateRequestSchema } from '../middleware/validation';
import { FriendRequestSchema } from '../middleware/validation/schemas/friend-request';
import { createFriendRequest } from '../controllers/friend-request';

const router = Router();

router.post('/', validateRequestSchema({ schema: FriendRequestSchema, type: 'body' }), createFriendRequest);

export default router;
