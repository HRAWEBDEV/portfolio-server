import { mysqlTable, serial, varchar, int } from 'drizzle-orm/mysql-core';
import { defaultTimestamps } from '../utils/defaultTimestamps.ts';

const testTable = mysqlTable('tests', {
 id: serial('id').primaryKey(),
 firstName: varchar('first_name', { length: 255 }).notNull(),
 lastName: varchar('last_name', { length: 255 }).notNull(),
 age: int('age').notNull(),
 email: varchar('email', { length: 255 }),
 ...defaultTimestamps,
});

type NewTest = typeof testTable.$inferSelect;

export { type NewTest, testTable };
