import { defineConfig } from 'drizzle-kit';

export default defineConfig({
 out: './drizzle',
 schema: './src/db/schema.ts',
 dialect: 'mysql',
 dbCredentials: {
  host: Deno.env.get('DB_HOST')!,
  user: Deno.env.get('DB_USER')!,
  password: Deno.env.get('DB_PASSWORD')!,
  database: 'portfolio',
 },
});
