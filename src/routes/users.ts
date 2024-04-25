import { Router } from 'express';

import { createUser, getAllUsers } from '../controllers/users';
import { validateRequestSchema } from '../middleware/validation';
import { CreateUserSchema } from '../middleware/validation/schemas/user';

const router = Router();

router.post('/', validateRequestSchema({ schema: CreateUserSchema, type: 'body' }), createUser);

router.get('/', getAllUsers);

export default router;
