import { defineConfig } from '@prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Cargamos la URL del .env
const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export default defineConfig({
  datasource: {
    adapter: adapter, // Pasamos el adaptador con la conexión local
  },
});