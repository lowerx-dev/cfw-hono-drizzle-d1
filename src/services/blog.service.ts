import { eq } from 'drizzle-orm';
import { getDB } from "../db";

// Service
import { blogModel } from "../model/blog.model";

// Typeing
import { type BlogModel } from '../model/blog.model';
import { type CreateBlogSchema } from '../schema/blog.schema';

export class BlogService {

    static async GetBlogAll(env: any): Promise<BlogModel[]> {
        const db = getDB(env);
        const result = await db.select()
            .from(blogModel)
            .all();

        return result;
    }

    static async GetBlogByID(env: any, id: string): Promise<BlogModel> {
        const db = getDB(env);
        const blog_id = parseInt(id);

        const result = await db.select()
            .from(blogModel)
            .where(eq(blogModel.id, blog_id))
            .limit(1);

        return result[0];
    }

    static async CreateBlog(env: any, data: CreateBlogSchema): Promise<BlogModel> {
        const db = getDB(env);
        const result = await db.insert(blogModel).values(data).returning();

        return result[0];
    }

    static async UpdateBlog(env: any, id: string, data: Partial<CreateBlogSchema>): Promise<BlogModel> {
        const db = getDB(env);
        const blog_id = parseInt(id);

        let result = await db.select()
            .from(blogModel)
            .where(eq(blogModel.id, blog_id))
            .limit(1);

        if (result.length === 0) {
            throw Error("Blog post not found");
        }

        result = await db.update(blogModel)
            .set(data)
            .where(eq(blogModel.id, blog_id))
            .returning();

        return result[0];
    }

    static async DeleteBlog(env: any, id: string): Promise<boolean> {
        const db = getDB(env);
        const blog_id = parseInt(id);

        let result;

        // ตรวจสอบ ID Blog
        result = await db.select()
            .from(blogModel)
            .where(eq(blogModel.id, blog_id))
            .limit(1);
        
        if (result.length === 0) {
            throw Error("Blog post not found");
        }

        // ลบ Blog
        result = await db.delete(blogModel)
            .where(eq(blogModel.id, blog_id));
        
        return result.success;
    }
}