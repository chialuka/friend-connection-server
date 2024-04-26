import { Router } from 'express';
import { getUserConnections } from '../controllers/connections';
import { validateRequestSchema } from '../middleware/validation';
import { UserIdSchema } from '../middleware/validation/schemas/common';

const router = Router();

router.get('/:userId', validateRequestSchema({ schema: UserIdSchema, type: 'params' }), getUserConnections);

export default router;
