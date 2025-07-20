import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema.ts';

const poolConnection = mysql.createPool({
 database: Deno.env.get('DB_DATABASE'),
 host: Deno.env.get('DB_HOST'),
 user: Deno.env.get('DB_USER'),
 password: Deno.env.get('DB_PASSWORD'),
 connectionLimit: 10,
});

const db = drizzle({
 client: poolConnection,
 schema,
 mode: 'default',
 casing: 'snake_case',
});

async function testConnection(): Promise<boolean> {
 try {
  const connection = await poolConnection.getConnection();
  await connection.ping();
  console.log('mysql connection succeeded');
 } catch (err) {
  console.log(`mysql connection failed`, err);
  return false;
 }
 return true;
}

export { db, testConnection };
