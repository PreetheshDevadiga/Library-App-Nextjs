import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { AppEnvs } from "../../read-env";

export const pool = mysql.createPool(AppEnvs.DATABASE_URL);

export const db: MySql2Database<Record<string, never>> = drizzle(pool);
