import { int, mysqlTable, serial } from 'drizzle-orm/mysql-core';
import {
 createSelectSchema,
 createUpdateSchema,
 createInsertSchema,
} from 'drizzle-zod';
import { persons } from './persons.ts';

type User = typeof users.$inferSelect;
type UpdateUser = typeof users.$inferInsert;

const users = mysqlTable('users', {
 id: serial('id').primaryKey(),
 personId: int('person_id')
  .notNull()
  .references(() => persons.id, {
   onDelete: 'cascade',
  }),
});

const selectUserSchema = createSelectSchema(users);
const insertUserSchema = createInsertSchema(users);
const updateUserSchema = createUpdateSchema(users);

export {
 type User,
 type UpdateUser,
 users,
 selectUserSchema,
 insertUserSchema,
 updateUserSchema,
};
