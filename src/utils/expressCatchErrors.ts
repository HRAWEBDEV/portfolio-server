import { ErrorRequestHandler } from 'express';
import { status } from 'http-status';
import { getResponse } from './getResponse.ts';
import { ZodError } from 'zod';

export const expressCatchErrors: ErrorRequestHandler = (
 err,
 _req,
 res,
 _next
) => {
 const resStatus = 'failed';
 // handle zod validation error
 if (err instanceof ZodError) {
  res.status(status.BAD_REQUEST).json(
   getResponse({
    status: resStatus,
    message: err.message,
   })
  );
  return;
 }
 //  what else should be handled here?
 //
 res.status(status.INTERNAL_SERVER_ERROR).json(
  getResponse({
   status: resStatus,
   message: err.message,
  })
 );
};
