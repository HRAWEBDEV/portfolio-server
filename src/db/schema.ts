import {
 mysqlTable,
 serial,
 varchar,
 int,
 timestamp,
} from 'drizzle-orm/mysql-core';

export const testTable = mysqlTable('test', {
 id: serial().primaryKey(),
 firstName: varchar({ length: 100 }).notNull(),
 lastName: varchar({ length: 100 }).notNull(),
 age: int().notNull(),
 email: varchar({ length: 100 }),
 createdAt: timestamp().defaultNow(),
});
