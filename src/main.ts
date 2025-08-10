import '@std/dotenv/load';
import express from 'express';
import { load } from '@std/dotenv';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import { testConnection } from '@/db/index.ts';
import { notFoundHandler } from './utils/notFoundHandler.ts';
import { expressCatchErrors } from './utils/expressCatchErrors.ts';

// load env files
await load({ envPath: '.env.local', export: true });
//
const appVersion = Deno.env.get('VERSION') || '';
const app = express();
const appBaseUri = `/api/${appVersion}`;
//
app.use(express.json());
// rate limiter
const rateLimiter = rateLimit({
 windowMs: 5 * 60 * 1000, // 5 min
 limit: 100,
 standardHeaders: 'draft-8',
 legacyHeaders: false,
 ipv6Subnet: 56,
 message: 'TOO MANY REQUEST, PLEASE TRY AGAIN LATER!',
});
app.use(rateLimiter);
// cors
const corsOptions = {};
app.use(cors(corsOptions));
// helmet
app.use(helmet());
// handlers
app.get('/healthy', (_req, res) => {
 res.json({
  status: 'success',
  message: 'api is listening',
 });
});
// routes
// not found
app.use(notFoundHandler);
app.use(expressCatchErrors);
// start app
const PORT = Deno.env.get('PORT') || 8080;
function onListen() {
 console.log(`server is listening to port: ${PORT}`);
 console.log(`app version: ${appVersion}`);
 console.log(`app base uri: ${appBaseUri}`);
}
async function startApp() {
 if (await testConnection()) {
  app.listen(PORT, onListen);
 } else {
  console.log('failed to start app');
 }
}
startApp();
