import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import { AppEnvs } from '../../../../read-env';
async function main() {
  const migrateClient = mysql.createPool(AppEnvs.DATABASE_URL);
  const db = drizzle(migrateClient);
  await migrate(db, {
    migrationsFolder: "./database/src/drizzle/migrations",
  });
  await migrateClient.end();
}

main();
