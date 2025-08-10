import { eq } from 'drizzle-orm';
import { wrap } from '../../utils/expressAsyncWrapper.ts';
import { RequestHandler } from 'express';
import { db } from '@/db/index.ts';
import { getResponse } from '../../utils/getResponse.ts';
import {
 persons,
 personInsertSchema,
 personUpdateSchema,
} from '../../db/schema/persons.ts';
import { NotFound } from '@/utils/NotFound.ts';

const getPersons: RequestHandler = wrap(async (_, res) => {
 const personsData = await db.select().from(persons);
 res.json(
  getResponse({
   status: 'success',
   data: personsData,
  })
 );
});

const createPerson: RequestHandler = wrap(async (req, res) => {
 const { firstName, lastName, age, gender, isMarried } = req.body;
 const newPerson = {
  firstName,
  lastName,
  age,
  gender,
  isMarried,
 };
 await personInsertSchema.parseAsync(newPerson);
 const person = await db.insert(persons).values(newPerson).$returningId();
 res.json(
  getResponse({
   status: 'success',
   data: person,
  })
 );
});

const getPerson: RequestHandler = wrap(async (req, res) => {
 const { id } = req.params;
 const idNum = parseInt(id);

 await personInsertSchema.shape.id.parseAsync(idNum);
 const person = await db.query.persons.findFirst({
  where: eq(persons.id, idNum),
 });
 if (!person) {
  throw new NotFound('Person not found');
 }
 res.json(
  getResponse({
   status: 'success',
   data: person,
  })
 );
});

const updatePerson: RequestHandler = wrap(async (req, res) => {
 const { id } = req.params;
 const { firstName, lastName, age, gender, isMarried } = req.body;
 const updatePerson = {
  firstName,
  lastName,
  age,
  gender,
  isMarried,
 };
 const idNum = parseInt(id);
 await personInsertSchema.shape.id.parseAsync(idNum);
 await personUpdateSchema.parseAsync(updatePerson);
 const result = await db
  .update(persons)
  .set(updatePerson)
  .where(eq(persons.id, idNum));

 if (!result[0].affectedRows) {
  throw new NotFound('User not found');
 }
 res.json(
  getResponse({
   status: 'success',
   data: { id: idNum, ...updatePerson },
  })
 );
});

const deletePerson: RequestHandler = wrap(async (req, res) => {
 const { id } = req.params;
 const idNum = parseInt(id);
 await personInsertSchema.shape.id.parseAsync(idNum);
 const result = await db.delete(persons).where(eq(persons.id, idNum));
 if (!result[0].affectedRows) {
  throw new NotFound('User not found');
 }
 res.json(
  getResponse({
   status: 'success',
   data: { id: idNum },
  })
 );
});

export { getPersons, getPerson, createPerson, updatePerson, deletePerson };
