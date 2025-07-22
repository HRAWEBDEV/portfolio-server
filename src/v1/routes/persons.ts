import { Router } from 'express';
import {
 getPersons,
 updatePerson,
 insertPerson,
 deletePerson,
} from '../controllers/persons.ts';

const router = Router();
router.route('/').get(getPersons).post(insertPerson);
router.route('/:id').patch(updatePerson).delete(deletePerson);

export default router;
