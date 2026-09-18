import { createPool } from '@vercel/postgres';

export const sql = createPool({
  connectionString: process.env.DATABASE_URL,
}).sql;
