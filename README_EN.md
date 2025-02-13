# 🔥 Hono JS + Cloudflare Workers + D1

📖 [อ่านเป็นภาษาไทย](./README.md)

A lightweight, high-performance project using **Hono.js** with **Cloudflare Workers** and **D1 Database**. This setup ensures a fast, scalable, and serverless backend.

```
📦 src/
┣━ 📂 controllers/           # 📌 Manages the business logic of the API
┃ ┗━ 📜 blog.controllers.ts   # 🔹 Handles Blog-related API (CRUD)
┣━ 📂 middleware/            # 📌 Middleware like Auth, Logger
┣━ 📂 model/                 # 📌 Manages data structures in the database
┃ ┗━ 📜 blog.model.ts         # 🔹 Defines the Model for Blog
┣━ 📂 routes/                # 📌 Defines API Routes (connects Controller with Middleware)
┃ ┗━ 📜 blog.routes.ts        # 🔹 Defines Routes for Blog (CRUD)
┣━ 📂 schema/                # 📌 Manages Schema Validation (using Zod)
┃ ┗━ 📜 blog.schema.ts        # 🔹 Defines Schema for Blog (Validation)
┣━ 📂 services/              # 📌 Separates Business Logic from Controller (e.g., database queries)
┃ ┗━ 📜 blog.service.ts       # 🔹 Manages Service Layer for Blog
┣━ 📜 db.ts                  # 🔹 Database connection settings (using Drizzle ORM)
┣━ 📜 app.ts                 # 🔥 Entry point of the app (Hono app instance)
┃
┣━ 📜 .gitignore             # 🔹 Defines files to be ignored by Git
┣━ 📜 drizzle.config.ts      # 🔹 Drizzle ORM configuration
┣━ 📜 package.json           # 🔹 Project package information and dependencies
┣━ 📜 README.md              # 🔹 Project description
┣━ 📜 README_EN.md           # 🔹 Project description (in English)
┣━ 📜 tsconfig.json          # 🔹 TypeScript configuration
┗━ 📜 wrangler.toml          # 🔹 Cloudflare Workers configuration (for deployment)
```

## 📦 Tech Stack
- **Hono.js** - A modern, fast web framework for Cloudflare Workers.
- **Cloudflare Workers** - Serverless functions running at the edge.
- **D1** - Cloudflare's SQL database for storing relational data.
- **Drizzle ORM** - A lightweight and type-safe ORM for database management.
- **Bun** - A fast JavaScript runtime for development and building.

---

## ⚙️ Development Setup

1. **Install dependencies** 🛠️
   ```sh
   bun install
   ```

2. **Generate database migrations** 📜
   ```sh
   bun run db:generate
   ```

3. **Create the D1 Database** 🗄️
   ```sh
   bunx wrangler d1 create cfw-hono-drizzle-d1
   ```

4. **Add D1 credentials to `wrangler.toml`** 🔑
   - Update the `wrangler.toml` file with the generated D1 database configuration.
   ```toml
    [[d1_databases]]
    binding = "DB"
    database_name = "my-d1-db"
    database_id = "your-d1-database-id"
   ```

5. **Run local SQLite database** 🏗️
   ```sh
   bun run db:up
   ```

6. **Apply migrations to local database** 🔄
   ```sh
   bunx wrangler d1 execute cfw-hono-drizzle-d1 --local --file=./drizzle/<migration-file-name>
   ```

7. **Start development server** 🚀
   ```sh
   bun run dev
   ```

---

## 🌍 Deploy to Production

1. **Apply migrations to Cloudflare D1** ☁️
   ```sh
   bunx wrangler d1 execute cfw-hono-drizzle-d1 --remote --file=./drizzle/<migration-file-name>
   ```

2. **Deploy the application** 📡
   ```sh
   bun run deploy
   ```

---

## 🎯 Features
- 🚀 **Blazing Fast** with Hono.js and Cloudflare Workers.
- 🌎 **Edge Deployment** ensures low latency and high availability.
- 🗄 **D1 Database** integration for structured data.
- 🏗 **Drizzle ORM** for easy schema migrations and queries.
- ⚡ **Bun Runtime** for superfast builds and execution.

Happy Coding! 🎉