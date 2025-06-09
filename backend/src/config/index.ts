export const databaseConfig = {
  client: 'pg',
  version: '12',
  connection: process.env.DATABASE_URL || {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}