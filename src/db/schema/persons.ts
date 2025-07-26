import {
 mysqlTable,
 serial,
 varchar,
 boolean,
 int,
} from 'drizzle-orm/mysql-core';
import { defaultTimestamps } from '../utils/defaultTimestamps.ts';
import {
 createSelectSchema,
 createUpdateSchema,
 createInsertSchema,
} from 'drizzle-zod';

type Person = typeof persons.$inferSelect;
type UpdatePerson = typeof persons.$inferInsert;

const persons = mysqlTable('persons', {
 id: int('id').autoincrement().primaryKey(),
 firstName: varchar('first_name', { length: 100 }).notNull(),
 lastName: varchar('last_name', { length: 150 }).notNull(),
 isMarried: boolean('is_married').default(false),
 age: int('age').notNull(),
 ...defaultTimestamps,
});

const selectPersonSchema = createSelectSchema(persons);
const insertPersonSchema = createInsertSchema(persons);
const updatePersonSchema = createUpdateSchema(persons);

export {
 type Person,
 type UpdatePerson,
 persons,
 selectPersonSchema,
 updatePersonSchema,
 insertPersonSchema,
};
