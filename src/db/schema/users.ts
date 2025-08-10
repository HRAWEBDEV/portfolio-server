import { eq } from 'drizzle-orm';
import { mysqlTable, int, varchar, mysqlView } from 'drizzle-orm/mysql-core';
import { persons } from './persons.ts';
import { defaultTimestamps } from '../utils/defaultTimestamps.ts';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';

type User = typeof users.$inferSelect;
type InsertUser = typeof users.$inferInsert;

const users = mysqlTable('users', {
 id: int('id').primaryKey().autoincrement(),
 personId: int('person_id')
  .notNull()
  .references(() => persons.id),
 phoneNo: varchar('phone_no', { length: 30 }).notNull(),
 email: varchar('email', { length: 250 }).notNull(),
 country: varchar('country', { length: 250 }).notNull(),
 city: varchar('city', { length: 250 }).notNull(),
 ...defaultTimestamps,
});

const userInsertSchema = createInsertSchema(users);
const userUpdateSchema = createUpdateSchema(users);

const userPersonsView = mysqlView('user-persons').as((qb) =>
 qb
  .select({
   id: users.id,
   personId: users.personId,
   firstName: persons.firstName,
   lastName: persons.lastName,
   age: persons.age,
   phoneNo: users.phoneNo,
   email: users.email,
   country: users.country,
   city: users.city,
   gender: persons.gender,
   isMarried: persons.isMarried,
  })
  .from(users)
  .leftJoin(persons, eq(users.personId, persons.id))
);

export {
 type User,
 type InsertUser,
 users,
 userInsertSchema,
 userUpdateSchema,
 userPersonsView,
};
