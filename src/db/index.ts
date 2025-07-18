import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const poolConnection = mysql.createPool({
 host: Deno.env.get('DB_HOST'),
 user: Deno.env.get('DB_USER'),
 password: Deno.env.get('DB_PASSWORD'),
 connectionLimit: 10,
});

const db = drizzle({
 client: poolConnection,
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
