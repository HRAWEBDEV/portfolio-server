import { Request, Response } from 'express';
import { getResponse } from './getResponse.ts';
import { status } from 'http-status';

export function notFoundHandler(_: Request, res: Response) {
 res.status(status.NOT_FOUND).json(
  getResponse({
   status: 'failed',
   message: 'API endpoint not found. Please check the URL and try again.',
  })
 );
}
