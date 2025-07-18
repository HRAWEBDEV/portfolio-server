import express from 'express';
import { load } from '@std/dotenv';
import { rateLimit } from 'express-rate-limit';

// load env files
await load({ envPath: '.env.local', export: true });
await load({ envPath: '.env', export: true });
//
const app = express();
// rate limiter
const rateLimiter = rateLimit({
 windowMs: 15 * 60 * 1000, // 15 min
 limit: 1,
 standardHeaders: 'draft-8',
 legacyHeaders: false,
 ipv6Subnet: 56,
 message: 'TOO MANY REQUEST, PLEASE TRY AGAIN LATER!',
});
app.use(rateLimiter);
// handlers
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
