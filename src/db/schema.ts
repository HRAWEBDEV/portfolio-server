import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const testTable = mysqlTable('test', {
 id: serial().primaryKey(),
 test: varchar({ length: 10 }),
});
