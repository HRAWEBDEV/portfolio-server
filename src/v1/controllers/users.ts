import { eq } from 'drizzle-orm';
import { wrap } from '../../utils/expressAsyncWrapper.ts';
import { RequestHandler } from 'express';
import { db } from '@/db/index.ts';
import { getResponse } from '../../utils/getResponse.ts';
import {
 users,
 userInsertSchema,
 userUpdateSchema,
 userPersonsView,
} from '../../db/schema/users.ts';
import { NotFound } from '@/utils/NotFound.ts';

const getUsers: RequestHandler = wrap(async (_, res) => {
 const usersData = await db.select().from(userPersonsView);
 res.json(
  getResponse({
   status: 'success',
   data: usersData,
  })
 );
});

const createUser: RequestHandler = wrap(async (req, res) => {
 const { personId, phoneNo, email, country, city } = req.body;
 const newUser = {
  personId,
  phoneNo,
  email,
  country,
  city,
 };
 await userInsertSchema.parseAsync(newUser);
 const user = await db.insert(users).values(newUser).$returningId();
 res.json(
  getResponse({
   status: 'success',
   data: user,
  })
 );
});

const getUser: RequestHandler = wrap(async (req, res) => {
 const { id } = req.params;
 const idNum = parseInt(id);

 await userInsertSchema.shape.id.parseAsync(idNum);
 const user = await db.query.persons.findFirst({
  where: eq(users.id, idNum),
 });
 if (!user) {
  throw new NotFound('User not found');
 }
 res.json(
  getResponse({
   status: 'success',
   data: user,
  })
 );
});

const updateUser: RequestHandler = wrap(async (req, res) => {
 const { id } = req.params;
 const { personId, phoneNo, email, country, city } = req.body;
 const newUser = {
  personId,
  phoneNo,
  email,
  country,
  city,
 };
 const idNum = parseInt(id);
 await userInsertSchema.shape.id.parseAsync(idNum);
 await userUpdateSchema.parseAsync(newUser);
 const result = await db.update(users).set(newUser).where(eq(users.id, idNum));

 if (!result[0].affectedRows) {
  throw new NotFound('User not found');
 }
 res.json(
  getResponse({
   status: 'success',
   data: { id: idNum, ...newUser },
  })
 );
});

const deleteUser: RequestHandler = wrap(async (req, res) => {
 const { id } = req.params;
 const idNum = parseInt(id);
 await userInsertSchema.shape.id.parseAsync(idNum);
 const result = await db.delete(users).where(eq(users.id, idNum));
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

export { getUsers, getUser, updateUser, createUser, deleteUser };
