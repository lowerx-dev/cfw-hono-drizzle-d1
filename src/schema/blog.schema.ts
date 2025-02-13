import { z } from 'zod';

export const createBlogSchema = z.object({
    title: z.string()
        .min(5, 'ชื่อเรื่องต้องมีอย่างน้อย 10 ตัวอักษร')
        .max(256, 'ชื่อเรื่องตัวอักษรมากสุดได้เพียง 256 ตัวอักษร'),
    content: z.string()
        .min(15, 'เนื้อหาต้องมีอักขระอย่างน้อย 150 ตัว')
});

export type CreateBlogSchema = z.infer<typeof createBlogSchema>;