import { Router } from 'express';
import { getTests } from '../controllers/tests.ts';

const router = Router();

router.route('/').get(getTests);

export default router;
