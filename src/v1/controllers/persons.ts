import { Request, Response } from 'express';
import {
 persons,
 insertPersonSchema,
 updatePersonSchema,
} from '@/db/schema/person.ts';
import { db } from '@/db/index.ts';
import { getResponse } from '@/utils/getResponse.ts';
import { eq } from 'drizzle-orm';

async function getPersons(_: Request, res: Response) {
 const data = await db.query.persons.findMany();
 res.json(
  getResponse({
   data,
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
 await db.update(persons).set(newPerson).where(eq(persons.id, id));
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
 const deleteResult = await db.delete(persons).where(eq(persons.id, id));
 res.json(
  getResponse({
   data: deleteResult,
  })
 );
}

export { getPersons, insertPerson, updatePerson, deletePerson };
