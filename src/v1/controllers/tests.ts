import { Request, Response } from 'express';
import { db } from '../../db/index.ts';
import { getResponse } from '../../utils/getResponse.ts';

async function getTests(_: Request, res: Response) {
 const data = await db.query.testTable.findMany();
 res.json(
  getResponse({
   data,
  })
 );
}

export { getTests };
