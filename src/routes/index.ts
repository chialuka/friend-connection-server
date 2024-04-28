import { Router } from 'express';

import users from './users';
import friendRequest from './friend-request';
import connections from './connections';
import posts from './posts';

const router = Router();

router.use('/users', users);
router.use('/friend-requests', friendRequest);
router.use('/connections', connections);
router.use('/posts', posts);

export default router;
