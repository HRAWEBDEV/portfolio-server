import { Request, Response } from 'express';
import { persons } from '@/db/schema/index.ts';
import { db } from '@/db/index.ts';
import { getResponse } from '@/utils/getResponse.ts';
import { eq } from 'drizzle-orm';

async function getPersons(_: Request, res: Response) {
 throw new Error('test');
 const data = await db.query.persons.findMany();
 res.json(
  getResponse({
   data,
  })
 );
}

async function insertPerson(req: Request, res: Response) {
 const { firstName, lastName, age, isMarried } = req.body;
 const insetResult = await db
  .insert(persons)
  .values({
   firstName,
   lastName,
   age,
   isMarried,
  })
  .$returningId();
 res.json(
  getResponse({
   data: insetResult,
  })
 );
}

async function updatePerson(req: Request, res: Response) {
 const personID = req.params.id;
 const { firstName, lastName, age, isMarried } = req.body;
 await db
  .update(persons)
  .set({
   firstName,
   lastName,
   age,
   isMarried,
  })
  .where(eq(persons.id, Number(personID)));
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
 const deleteResult = await db
  .delete(persons)
  .where(eq(persons.id, Number(personID)));
 res.json(
  getResponse({
   data: deleteResult,
  })
 );
}

export { getPersons, insertPerson, updatePerson, deletePerson };
