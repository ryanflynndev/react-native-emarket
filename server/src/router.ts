import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { Request, Response } from "express";
import express from "express";
import { products } from "./db/schema";
import { config } from "dotenv";

if (process.env.NODE_ENV === 'production') {
  console.log('Running router in production mode');
  config({ path: '.prod.env' });
} else {
  console.log('Running router in development mode');
  config({ path: '.dev.env' });
}

console.log('Database URL:', process.env.DATABASE_URL);
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }});
const router = express.Router();
const db = drizzle(pool)

const handleQueryError = (err: Error, res: Response) => {
  console.error('Error executing query:', err.message);
  res.status(500).send({ error: 'An error occurred executing the query' });
};

router.get('/products', async (req: Request, res: Response) => {
  try {
    const productRows = await db.select().from(products);
    res.json(productRows);
  } catch (err) {
    handleQueryError(err, res);
  }
});

export default router;