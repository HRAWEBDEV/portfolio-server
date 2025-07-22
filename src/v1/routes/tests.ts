import { Router } from 'express';
import {
 getTests,
 insertTest,
 updateTest,
 deleteTest,
} from '../controllers/tests.ts';

const router = Router();

router.route('/').get(getTests).post(insertTest);
router.route('/:id').patch(updateTest).delete(deleteTest);

export default router;
