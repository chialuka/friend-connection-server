import { Router } from 'express';

import { createUser, getAllUsers, getNonFriends } from '../controllers/users';
import { validateRequestSchema } from '../middleware/validation';
import { CreateUserSchema } from '../middleware/validation/schemas/user';

const router = Router();

router.post('/', validateRequestSchema({ schema: CreateUserSchema, type: 'body' }), createUser);

router.get('/:userId', getAllUsers);

router.get('/non-friends/:userId', getNonFriends);

export default router;
