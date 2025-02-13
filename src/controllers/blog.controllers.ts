import { type Context } from "hono";

// Service
import { BlogService } from "../services/blog.service";
import { type CreateBlogSchema } from '../schema/blog.schema';

export class BlogController {

    static async GetBlogAll(ctx: Context) {
        const result = await BlogService.GetBlogAll(ctx.env);
        return ctx.json({ code: 1, message: null, data: result });
    }

    static async GetBlogByID(ctx: Context) {
        const id = ctx.req.param('id');
        const result = await BlogService.GetBlogByID(ctx.env, id);
        
        if (result) {
            return ctx.json({ code: 1, message: null, data: result });
        }
        return ctx.json({ code: 0, message: "Blog post not found", data: null }, 404);
    }

    static async CreateBlog(ctx: Context) {
        const body = (ctx.req as any).valid('json') as CreateBlogSchema;
        const result = await BlogService.CreateBlog(ctx.env, body);

        return ctx.json({ code: 1, message: null, data: result });
    }

    static async UpdateBlog(ctx: Context) {
        try {
            const id = ctx.req.param('id');
            const body = (ctx.req as any).valid('json') as Partial<CreateBlogSchema>;
            const result = await BlogService.UpdateBlog(ctx.env, id, body);

            return ctx.json({ code: 1, message: "Update Blog Success", data: result });
        } catch (err: any) {
            const error_message = err instanceof Error ? err.message : String(err);
            
            return ctx.json({ code: 0, message: error_message, data: null }, 404);
        }
    }

    static async DeleteBlog(ctx: Context) {
        try {
            const id = ctx.req.param('id');
            const result = await BlogService.DeleteBlog(ctx.env, id);

            if (!result) {
                return ctx.json({ code: 0, message: "Delete Blog Failed", data: null }, 400);
            }
            return ctx.json({ code: 1, message: "Delete Blog Success", data: null });
        } catch (err: any) {
            const error_message = err instanceof Error ? err.message : String(err);
            
            return ctx.json({ code: 0, message: error_message, data: null }, 404);
        }
    }

}