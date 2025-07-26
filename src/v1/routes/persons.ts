import { Router } from 'express';
import {
 getPersons,
 getPerson,
 updatePerson,
 insertPerson,
 deletePerson,
} from '../controllers/persons.ts';
import { wrap } from '@/utils/expressAsyncWrapper.ts';

const router = Router();
router.route('/').get(wrap(getPersons)).post(wrap(insertPerson));
router
 .route('/:id')
 .get(getPerson)
 .patch(wrap(updatePerson))
 .delete(wrap(deletePerson));

export default router;
