import {
 mysqlTable,
 serial,
 varchar,
 int,
 timestamp,
} from 'drizzle-orm/mysql-core';

const testTable = mysqlTable('test', {
 id: serial('id').primaryKey(),
 firstName: varchar('first_name', { length: 255 }).notNull(),
 lastName: varchar('last_name', { length: 255 }).notNull(),
 age: int('age').notNull(),
 email: varchar('email', { length: 255 }),
 createdAt: timestamp('created_at').$default(() => new Date()),
 updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});

type NewTest = typeof testTable.$inferSelect;

export { type NewTest, testTable };
