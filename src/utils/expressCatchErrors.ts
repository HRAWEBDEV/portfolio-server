import { ErrorRequestHandler } from 'express';
import { status } from 'http-status';
import { getResponse } from './getResponse.ts';

export const expressCatchErrors: ErrorRequestHandler = (
 err,
 _req,
 res,
 _next
) => {
 console.log(err.message);
 res.status(status.INTERNAL_SERVER_ERROR).json(
  getResponse({
   status: 'failed',
   message: err.message,
  })
 );
};
