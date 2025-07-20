import { timestamp } from 'drizzle-orm/mysql-core';

export const defaultTimestamps = {
 createdAt: timestamp('created_at').$default(() => new Date()),
 updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
};
