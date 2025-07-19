import { Request, Response } from 'express';
import { db } from '../../db/index.ts';

async function getTests(_: Request, res: Response) {
 const data = await db.query.testTable.findMany();
 res.json({
  data,
 });
}

export { getTests };
