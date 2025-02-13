import { Hono } from "hono";

// Routes Module
import blogRoutes from "./routes/blog.routes";

const app = new Hono();

// Routes
const root_api = app.basePath("/api/v1");
root_api.route("/blog", blogRoutes);

// Error Handling
app.notFound(async (ctx) => {
    return ctx.json({ code: 0, message: "Not Found", data: null }, 404);
});
app.onError(async (err, ctx) => {
    console.error(err);
    return ctx.json({ code: 0, message: "Internal Server Error", data: null }, 500);
});

export default app;