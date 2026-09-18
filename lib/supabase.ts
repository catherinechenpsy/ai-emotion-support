import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.warn('No database connection string found.');
}

export const sql = neon(connectionString || '');
