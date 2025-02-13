import { drizzle } from "drizzle-orm/d1";

export const getDB = (env: any) => {
    return drizzle(env.DB);
};