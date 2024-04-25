import { Router } from 'express';

import { createUser } from '../controllers/users';
import { validateRequestSchema } from '../middleware/validation';
import { CreateUserSchema } from '../middleware/validation/schemas/user';

const router = Router();

router.post('/', validateRequestSchema({ schema: CreateUserSchema, type: 'body' }), createUser);

export default router;
