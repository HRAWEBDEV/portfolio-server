import { Request, Response } from 'express';
import {
 users,
 insertUserSchema,
 updateUserSchema,
} from '../../db/schema/users.ts';
import { db } from '@/db/index.ts';
import { getResponse } from '@/utils/getResponse.ts';
import { eq } from 'drizzle-orm';
import { NotFound } from '@/utils/NotFound.ts';

async function getUsers(_: Request, res: Response) {
 const data = await db.query.users.findMany();
 res.json(
  getResponse({
   data,
  })
 );
}

async function getUser(req: Request, res: Response) {
 const personID = req.params.id;
 const id = Number.parseInt(personID);
 insertUserSchema.shape.id.parse(id);
 const user = await db.query.persons.findFirst({
  where: eq(users.id, id),
 });
 if (!user) {
  throw new NotFound();
 }
 res.json(
  getResponse({
   data: user,
  })
 );
}

async function insertUser(req: Request, res: Response) {
 const {} = req.body;
 const newUser = {
  personId: 1,
 };
 insertUserSchema.parse(newUser);
 const insetResult = await db.insert(users).values(newUser).$returningId();
 res.json(
  getResponse({
   data: insetResult,
  })
 );
}

async function updateUser(req: Request, res: Response) {
 const userID = req.params.id;
 const id = Number.parseInt(userID);
 const {} = req.body;
 const newUser = {};
 insertUserSchema.shape.id.parse(id);
 updateUserSchema.parse(newUser);
 const updateRes = await db.update(users).set(newUser).where(eq(users.id, id));
 if (updateRes[0].affectedRows === 0) {
  throw new NotFound();
 }
 res.json(
  getResponse({
   data: [
    {
     id: userID,
    },
   ],
  })
 );
}

async function deleteUser(req: Request, res: Response) {
 const userID = req.params.id;
 const id = Number.parseInt(userID);
 insertUserSchema.shape.id.parse(id);
 const deleteRes = await db.delete(users).where(eq(users.id, id));
 if (deleteRes[0].affectedRows === 0) {
  throw new NotFound();
 }
 res.json(
  getResponse({
   data: deleteRes,
  })
 );
}

export { getUser, getUsers, updateUser, insertUser, deleteUser };
