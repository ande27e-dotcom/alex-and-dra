import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// 1. Usamos la misma lógica que en tu config para la conexión
const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. Le pasamos el adaptador al constructor (Esto es lo que te pide el error)
export const prisma = new PrismaClient({
  adapter: adapter
});