import {
 mysqlTable,
 serial,
 varchar,
 boolean,
 int,
} from 'drizzle-orm/mysql-core';
import { defaultTimestamps } from '../utils/defaultTimestamps.ts';

export const persons = mysqlTable('persons', {
 id: serial('id'),
 firstName: varchar('first_name', { length: 100 }).notNull(),
 lastName: varchar('last_name', { length: 150 }).notNull(),
 isMarried: boolean('is_married').default(false),
 age: int('age').notNull(),
 ...defaultTimestamps,
});
