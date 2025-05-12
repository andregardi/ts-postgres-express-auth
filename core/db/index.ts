// import 'dotenv/config';
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT || '5432'),
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// const db = drizzle(pool);

// export { db };

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env

// Ensure required environment variables are set
const missingVariables = []
if (!DB_HOST) missingVariables.push('DB_HOST')
if (!DB_PORT) missingVariables.push('DB_PORT')
if (!DB_USERNAME) missingVariables.push('DB_USERNAME')
if (!DB_PASSWORD) missingVariables.push('DB_PASSWORD')
if (!DB_NAME) missingVariables.push('DB_NAME')

if (missingVariables.length > 0) {
  throw new Error(`Missing required environment variable(s): ${missingVariables.join(', ')}`)
}

// Create a new connection pool
const pool = new Pool({
  host: DB_HOST,
  port: parseInt(DB_PORT!),
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: false,
})

// Create the Drizzle database instance
export const db = drizzle(pool)
