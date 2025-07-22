import {
 mysqlTable,
 serial,
 varchar,
 boolean,
 int,
} from 'drizzle-orm/mysql-core';
import { defaultTimestamps } from '../utils/defaultTimestamps.ts';

const persons = mysqlTable('persons', {
 id: serial('id').primaryKey(),
 firstName: varchar('first_name', { length: 100 }).notNull(),
 lastName: varchar('last_name', { length: 150 }).notNull(),
 isMarried: boolean('is_married').default(false),
 age: int('age').notNull(),
 ...defaultTimestamps,
});

type Person = typeof persons.$inferSelect;

export { type Person, persons };
