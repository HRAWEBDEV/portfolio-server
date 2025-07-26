import { Request, Response } from 'express';
import { db } from '@/db/index.ts';
import { getResponse } from '@/utils/getResponse.ts';
import { tests } from '@/db/schema/index.ts';
import { eq } from 'drizzle-orm';

async function getTests(_: Request, res: Response) {
 const [data, count] = await Promise.all([
  db.query.tests.findMany({
   limit: 2,
   offset: 0,
  }),
  db.$count(tests),
 ]);

 res.json(
  getResponse({
   data: {
    data,
    count,
    limit: 1,
    offset: 0,
   },
  })
 );
}

async function insertTest(req: Request, res: Response) {
 const { firstName, lastName, age, email } = req.body;
 const insertResult = await db
  .insert(tests)
  .values([
   {
    firstName,
    lastName,
    age,
    email,
   },
  ])
  .$returningId();
 res.json(
  getResponse({
   data: insertResult,
  })
 );
}

async function updateTest(req: Request, res: Response) {
 const testID = req.params?.id;
 if (testID) {
  res.json(getResponse({}));
 }
 const { firstName, lastName, age, email } = req.body;
 const updateResult = await db
  .update(tests)
  .set({
   firstName,
   lastName,
   age,
   email,
  })
  .where(eq(tests.id, Number(testID)));
 res.json(
  getResponse({
   data: updateResult,
  })
 );
}
async function deleteTest(req: Request, res: Response) {
 const testID = req.params?.id;
 const updateResult = await db
  .delete(tests)
  .where(eq(tests.id, Number(testID)));
 res.json(
  getResponse({
   data: updateResult,
  })
 );
}

export { getTests, insertTest, updateTest, deleteTest };
