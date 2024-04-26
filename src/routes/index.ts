import { Router } from 'express';

import users from './users';
import friendRequest from './friend-request';
import connections from './connections';

const router = Router();

router.use('/users', users);
router.use('/friend-requests', friendRequest);
router.use('/connections', connections);

export default router;
