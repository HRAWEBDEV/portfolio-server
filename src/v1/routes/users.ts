import { Router } from 'express';
import {
 getUsers,
 createUser,
 deleteUser,
 getUser,
 updateUser,
} from '../controllers/users.ts';

const router = Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export { router };
