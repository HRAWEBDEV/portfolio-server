import { Router } from 'express';
import {
 getTests,
 insertTest,
 updateTest,
 deleteTest,
} from '../controllers/tests.ts';
import { wrap } from '@/utils/expressAsyncWrapper.ts';

const router = Router();

router.route('/').get(wrap(getTests)).post(wrap(insertTest));
router.route('/:id').patch(wrap(updateTest)).delete(wrap(deleteTest));

export default router;
