import { NotFound } from './NotFound.ts';

export function notFoundHandler() {
 throw new NotFound(
  'API endpoint not found. Please check the URL and try again.'
 );
}
