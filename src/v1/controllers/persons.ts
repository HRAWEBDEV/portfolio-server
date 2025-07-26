import { Request, Response } from 'express';
import {
 persons,
 insertPersonSchema,
 updatePersonSchema,
} from '../../db/schema/persons.ts';
import { db } from '@/db/index.ts';
import { getResponse } from '@/utils/getResponse.ts';
import { eq } from 'drizzle-orm';
import { NotFound } from '@/utils/NotFound.ts';

async function getPersons(_: Request, res: Response) {
 const data = await db.query.persons.findMany();
 res.json(
  getResponse({
   data,
  })
 );
}

async function getPerson(req: Request, res: Response) {
 const personID = req.params.id;
 const id = Number.parseInt(personID);
 insertPersonSchema.shape.id.parse(id);
 const person = await db.query.persons.findFirst({
  where: eq(persons.id, id),
 });
 if (!person) {
  throw new NotFound();
 }
 res.json(
  getResponse({
   data: person,
  })
 );
}

async function insertPerson(req: Request, res: Response) {
 const { firstName, lastName, age, isMarried } = req.body;
 const newPerson = {
  firstName,
  lastName,
  age,
  isMarried,
 };
 insertPersonSchema.parse(newPerson);
 const insetResult = await db.insert(persons).values(newPerson).$returningId();
 res.json(
  getResponse({
   data: insetResult,
  })
 );
}

async function updatePerson(req: Request, res: Response) {
 const personID = req.params.id;
 const id = Number.parseInt(personID);
 const { firstName, lastName, age, isMarried } = req.body;
 const newPerson = {
  firstName,
  lastName,
  age,
  isMarried,
 };
 insertPersonSchema.shape.id.parse(id);
 updatePersonSchema.parse(newPerson);
 const updateRes = await db
  .update(persons)
  .set(newPerson)
  .where(eq(persons.id, id));
 if (updateRes[0].affectedRows === 0) {
  throw new NotFound();
 }
 res.json(
  getResponse({
   data: [
    {
     id: personID,
    },
   ],
  })
 );
}

async function deletePerson(req: Request, res: Response) {
 const personID = req.params.id;
 const id = Number.parseInt(personID);
 insertPersonSchema.shape.id.parse(id);
 const deleteRes = await db.delete(persons).where(eq(persons.id, id));
 if (deleteRes[0].affectedRows === 0) {
  throw new NotFound();
 }
 res.json(
  getResponse({
   data: deleteRes,
  })
 );
}

export { getPersons, getPerson, insertPerson, updatePerson, deletePerson };
