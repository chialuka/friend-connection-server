import { Router } from 'express';

import { createUser, getAllUsers, getNonFriends } from '../controllers/users';
import { validateRequestSchema } from '../middleware/validation';
import { CreateUserSchema } from '../middleware/validation/schemas/user';
import { UserIdSchema } from '../middleware/validation/schemas/common';

const router = Router();

router.post('/', validateRequestSchema({ schema: CreateUserSchema, type: 'body' }), createUser);

router.get('/:userId', validateRequestSchema({ schema: UserIdSchema, type: 'params' }), getAllUsers);

router.get('/members/:userId', validateRequestSchema({ schema: UserIdSchema, type: 'params' }), getNonFriends);

export default router;
