import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const testTable = mysqlTable('test', {
 id: serial().primaryKey(),
 other: varchar({ length: 10 }),
});
