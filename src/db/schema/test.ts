import { mysqlTable, serial, varchar, int } from 'drizzle-orm/mysql-core';
import { defaultTimestamps } from '../utils/defaultTimestamps.ts';

const tests = mysqlTable('tests', {
 id: serial('id').primaryKey(),
 firstName: varchar('first_name', { length: 255 }).notNull(),
 lastName: varchar('last_name', { length: 255 }).notNull(),
 age: int('age').notNull(),
 email: varchar('email', { length: 255 }),
 ...defaultTimestamps,
});

type NewTest = typeof tests.$inferSelect;

export { type NewTest, tests };
