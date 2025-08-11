import { ErrorRequestHandler } from 'express';
import { status } from 'http-status';
import { getResponse } from './getResponse.ts';
import { ZodError } from 'zod';
import { NotFound } from './NotFound.ts';

export const expressCatchErrors: ErrorRequestHandler = (
 err,
 _req,
 res,
 _next
) => {
 const resStatus = 'error';
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
 // not found
 if (err instanceof NotFound) {
  res.status(status.NOT_FOUND).json(
   getResponse({
    status: resStatus,
    message: err.message,
   })
  );
  return;
 }
 //
 res.status(status.INTERNAL_SERVER_ERROR).json(
  getResponse({
   status: resStatus,
   message: err.message,
  })
 );
};
