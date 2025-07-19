import { Request, Response } from 'express';
import { db } from '../../db/index.ts';
import { testTable } from '../../db/schema.ts';

async function getTests(_: Request, res: Response) {
 const data = await db.select().from(testTable);
 res.json({
  data,
 });
}

export { getTests };
