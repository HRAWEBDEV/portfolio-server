import { load } from '@std/dotenv';

// load env files
await load({ envPath: '.env.local', export: true });
await load({ envPath: '.env', export: true });
//
