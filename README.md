# 🔥 Hono JS + Cloudflare Workers + D1

📖 [Read in English](./README_EN.md)

โปรเจกต์ที่ใช้ **Hono.js** ร่วมกับ **Cloudflare Workers** และ **D1 Database** เพื่อสร้างแอปพลิเคชันที่มีประสิทธิภาพสูงและสามารถขยายขนาดได้ง่าย

```
📦 src/
┣━ 📂 controllers/           # 📌 จัดการ Business Logic ของ API
┃ ┗━ 📜 blog.controllers.ts   # 🔹 จัดการ API ที่เกี่ยวกับ Blog (CRUD)
┣━ 📂 middleware/            # 📌 Middleware ต่าง ๆ เช่น Auth, Logger
┣━ 📂 model/                 # 📌 จัดการโครงสร้างข้อมูลใน Database
┃ ┗━ 📜 blog.model.ts         # 🔹 กำหนด Model สำหรับ Blog
┣━ 📂 routes/                # 📌 กำหนด API Routes (เชื่อม Controller กับ Middleware)
┃ ┗━ 📜 blog.routes.ts        # 🔹 กำหนด Route สำหรับ Blog (CRUD)
┣━ 📂 schema/                # 📌 จัดการ Schema Validation (ใช้ Zod)
┃ ┗━ 📜 blog.schema.ts        # 🔹 กำหนด Schema ของ Blog (Validation)
┣━ 📂 services/              # 📌 แยก Business Logic ออกจาก Controller (เช่น database queries)
┃ ┗━ 📜 blog.service.ts       # 🔹 จัดการ Service Layer ของ Blog
┣━ 📜 db.ts                  # 🔹 ตั้งค่าการเชื่อมต่อ Database (ใช้ Drizzle ORM)
┣━ 📜 app.ts                 # 🔥 จุดเริ่มต้นของแอป (Hono app instance)
┃
┣━ 📜 .gitignore             # 🔹 ไฟล์กำหนดสิ่งที่ไม่ต้องการให้ Git track
┣━ 📜 drizzle.config.ts      # 🔹 การตั้งค่า Drizzle ORM
┣━ 📜 package.json           # 🔹 ข้อมูลแพ็กเกจและ dependencies ของโปรเจกต์
┣━ 📜 README.md              # 🔹 คำอธิบายโปรเจกต์
┣━ 📜 README_EN.md           # 🔹 คำอธิบายโปรเจกต์ (ภาษาอังกฤษ)
┣━ 📜 tsconfig.json          # 🔹 การตั้งค่า TypeScript
┗━ 📜 wrangler.toml          # 🔹 การตั้งค่า Cloudflare Workers (สำหรับ deploy)
```

## 📦 เทคโนโลยีที่ใช้
- **Hono.js** - เว็บเฟรมเวิร์กที่ทันสมัยและรวดเร็วสำหรับ Cloudflare Workers
- **Cloudflare Workers** - ฟังก์ชันเซิร์ฟเวอร์เลสที่ทำงานบน Edge
- **D1** - ฐานข้อมูล SQL ของ Cloudflare สำหรับเก็บข้อมูลแบบ relational
- **Drizzle ORM** - ORM ที่เบาและปลอดภัยสำหรับจัดการฐานข้อมูล
- **Bun** - Runtime ที่รวดเร็วสำหรับการพัฒนาและการ build

---

## ⚙️ การตั้งค่าเพื่อพัฒนา

1. **ติดตั้ง Dependencies** 🛠️
   ```sh
   bun install
   ```

2. **สร้างไฟล์ Migration สำหรับฐานข้อมูล** 📜
   ```sh
   bun run db:generate
   ```

3. **สร้างฐานข้อมูล D1** 🗄️
   ```sh
   bunx wrangler d1 create cfw-hono-drizzle-d1
   ```

4. **เพิ่มข้อมูลรับรอง D1 ลงใน `wrangler.toml`** 🔑
   - อัปเดตไฟล์ `wrangler.toml` ด้วยค่าคอนฟิกที่ได้จาก Cloudflare
   ```toml
    [[d1_databases]]
    binding = "DB"
    database_name = "my-d1-db"
    database_id = "your-d1-database-id"
   ```

5. **รันฐานข้อมูล SQLite บนเครื่อง** 🏗️
   ```sh
   bun run db:up
   ```

6. **ใช้ Migration กับฐานข้อมูลในเครื่อง** 🔄
   ```sh
   bunx wrangler d1 execute cfw-hono-drizzle-d1 --local --file=./drizzle/<ชื่อไฟล์-migration>
   ```

7. **เริ่มเซิร์ฟเวอร์สำหรับพัฒนา** 🚀
   ```sh
   bun run dev
   ```

---

## 🌍 การ Deploy ไปยัง Production

1. **ใช้ Migration กับฐานข้อมูล D1 บน Cloudflare** ☁️
   ```sh
   bunx wrangler d1 execute cfw-hono-drizzle-d1 --remote --file=./drizzle/<ชื่อไฟล์-migration>
   ```

2. **Deploy แอปพลิเคชัน** 📡
   ```sh
   bun run deploy
   ```

---

## 🎯 คุณสมบัติ
- 🚀 **รวดเร็ว** ด้วย Hono.js และ Cloudflare Workers
- 🌎 **Deploy บน Edge** เพื่อความหน่วงต่ำและความพร้อมใช้งานสูง
- 🗄 **รองรับฐานข้อมูล D1** สำหรับข้อมูลที่มีโครงสร้าง
- 🏗 **Drizzle ORM** สำหรับการจัดการ Schema และ Query ที่ง่ายขึ้น
- ⚡ **Bun Runtime** เพื่อการพัฒนาและการทำงานที่เร็วขึ้น

Happy Coding! 🎉