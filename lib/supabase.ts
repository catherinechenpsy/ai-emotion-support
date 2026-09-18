import { neon } from '@neondatabase/serverless';

const connectionString = postgresql://neondb_owner:npg_SHv8QXODm1Jg@ep-blue-butterfly-auqn5wv2-pooler.c-10.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
export const sql = neon(connectionString);
