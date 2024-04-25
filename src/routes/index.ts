import { Router } from 'express';

import users from './users';
import friendRequest from './friend-request';

const router = Router();

router.use('/users', users);
router.use('/friend-requests', friendRequest);

export default router;
