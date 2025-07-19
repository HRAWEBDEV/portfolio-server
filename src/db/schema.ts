import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const testTable = mysqlTable('test', {
 id: serial('id').primaryKey(),
 other: varchar('other', { length: 10 }),
});
