import { mysqlTable, int, varchar, mysqlEnum } from 'drizzle-orm/mysql-core';
import { defaultTimestamps } from '../utils/defaultTimestamps.ts';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';

type Person = typeof persons.$inferSelect;
type InsertPerson = typeof persons.$inferInsert;

const persons = mysqlTable('persons', {
 id: int('id').primaryKey().autoincrement(),
 firstName: varchar('first_name', { length: 150 }).notNull(),
 lastName: varchar('last_name', { length: 250 }).notNull(),
 age: int('age').notNull(),
 gender: mysqlEnum('gender', ['male', 'female']).notNull(),
 ...defaultTimestamps,
});

const personInsertSchema = createInsertSchema(persons);
const personUpdateSchema = createUpdateSchema(persons);

export {
 type Person,
 type InsertPerson,
 persons,
 personInsertSchema,
 personUpdateSchema,
};
