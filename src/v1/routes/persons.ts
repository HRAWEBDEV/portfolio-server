import { Router } from 'express';
import {
 getPersons,
 getPerson,
 createPerson,
 updatePerson,
 deletePerson,
} from '../controllers/persons.ts';

const router = Router();

router.route('/').get(getPersons).post(createPerson);

router.route('/:id').get(getPerson).patch(updatePerson).delete(deletePerson);

export { router };
