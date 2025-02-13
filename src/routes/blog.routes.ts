import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

// Model
import { createBlogSchema } from "../schema/blog.schema";

// Controller
import { BlogController } from "../controllers/blog.controllers";

const routes = new Hono();

// Get Blog
routes.get("/", BlogController.GetBlogAll);
routes.get(
    "/:id",
    zValidator("param",
        z.object({
            id: z.string().regex(/^\d+$/, 'ID must be a numeric string'),
        }),
        (result, ctx) => {
            if (!result.success) {
                const errorMessage = result.error.issues[0]?.message || "Invalid request";
                return ctx.json({ code: 0, message: errorMessage, data: null }, 400);
            }
        }
    ),
    BlogController.GetBlogByID
);

// Create Blog
routes.post(
    "/post",
    zValidator("json", createBlogSchema, (result, ctx) => {
        if (!result.success) {
            const errorMessage = result.error.issues[0]?.message || "Invalid request";
            return ctx.json({ code: 0, message: errorMessage, data: null }, 400);
        }
    }),
    BlogController.CreateBlog
);

// Update Blog
routes.put(
    "/:id",
    zValidator("param",
        z.object({
            id: z.string().regex(/^\d+$/, 'ID must be a numeric string'),
        }),
        (result, ctx) => {
            if (!result.success) {
                const errorMessage = result.error.issues[0]?.message || "Invalid request";
                return ctx.json({ code: 0, message: errorMessage, data: null }, 400);
            }
        }
    ),
    zValidator("json", createBlogSchema.partial(), (result, ctx) => {
        if (!result.success) {
            const errorMessage = result.error.issues[0]?.message || "Invalid request";
            return ctx.json({ code: 0, message: errorMessage, data: null }, 400);
        }
    }),
    BlogController.UpdateBlog
);

// Delete Blog
routes.delete(
    "/:id",
    zValidator("param",
        z.object({
            id: z.string().regex(/^\d+$/, 'ID must be a numeric string'),
        }),
        (result, ctx) => {
            if (!result.success) {
                const errorMessage = result.error.issues[0]?.message || "Invalid request";
                return ctx.json({ code: 0, message: errorMessage, data: null }, 400);
            }
        }
    ),
    BlogController.DeleteBlog
)

export default routes;