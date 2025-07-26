import { Router } from 'express';
import {
 deleteUser,
 getUser,
 getUsers,
 insertUser,
 updateUser,
} from '../controllers/users.ts';
import { wrap } from '@/utils/expressAsyncWrapper.ts';

const router = Router();
router.route('/').get(wrap(getUsers)).post(wrap(insertUser));
router
 .route('/:id')
 .get(wrap(getUser))
 .patch(wrap(updateUser))
 .delete(wrap(deleteUser));

export default router;
