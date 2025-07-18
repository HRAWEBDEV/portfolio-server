import '@std/dotenv/load';
import express from 'express';
import { load } from '@std/dotenv';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';

// load env files
await load({ envPath: '.env.local', export: true });
//
const app = express();
// rate limiter
const rateLimiter = rateLimit({
 windowMs: 5 * 60 * 1000, // 15 min
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

app.get('/', (_req, res) => {
 res.json({
  data: 'success',
 });
});
// start server
const PORT = Deno.env.get('PORT') || 8080;

function onListen() {
 console.log(`server is listening to port ${PORT}`);
}
app.listen(PORT, onListen);
