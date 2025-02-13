import { z } from 'zod';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const blogModel = sqliteTable('blog', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    title: text('title', { length: 256 }).notNull(),
    content: text('content').notNull(),
    timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

const BlogModel = z.object({
    id: z.number().optional(),
    title: z.string(),
    content: z.string(),
    timestamp: z.string(),
});

export type BlogModel = z.infer<typeof BlogModel>;