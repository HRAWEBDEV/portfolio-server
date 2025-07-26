import { status } from 'http-status';

export class NotFound extends Error {
 public status: number;
 constructor(message: string = 'Resource not found') {
  super(message);
  this.name = 'NotFound';
  this.status = status.NOT_FOUND;
  // Maintains proper stack trace for where our error was thrown (only available on V8)
  if (Error.captureStackTrace) {
   Error.captureStackTrace(this, NotFound);
  }
 }
}
