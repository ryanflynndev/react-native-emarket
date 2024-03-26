import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { Request, Response } from "express";
import express from "express";
import { OrderItem, order_items, orders, products } from "./db/schema";
import { config } from "dotenv";
import { eq } from "drizzle-orm";

if (process.env.NODE_ENV === 'production') {
  console.log('Running router in production mode');
  config({ path: '.prod.env' });
} else {
  console.log('Running router in development mode');
  config({ path: '.dev.env' });
}

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
    if (productRows.length === 0) {
      res.status(404).send({ error: 'No products found' });
      return;
    }
    res.json(productRows);
  } catch (err) {
    handleQueryError(err, res);
  }
});

router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productRow = await db.select().from(products).where(eq(products.id, +id));
    if (productRow.length === 0) {
      res.status(404).send({ error: 'No products found' });
      return;
    }
    res.json(productRow);
  } catch (err) {
    handleQueryError(err, res);
  }
});

router.post('/orders', async (req: Request, res: Response) => {
  try {
    // Body will have customer_email and products ordered
    // Named order products so we don't get con fused with the products table
    const { customer_email, products: orderProducts } = req.body;
    const order = await db.transaction(async (trx) => {
      // Creates a new order
      const [newOrder] = await trx.insert(orders).values({ customer_email }).returning();
      // Gets all the up to date product prices from the db to calculate the total
      const productPrices = await Promise.all(
        orderProducts.map(async (orderProduct: any) => {
          const [product] = await trx.select().from(products).where(eq(products.id, +orderProduct.product_id));
          return product.product_price;
        })
      );
      
      // Creates the order items for each product ordered
      const orderItems = await Promise.all(
          orderProducts.map(async (orderProduct: any, index: number) => {
          // Calculates total price for each order item
          const totalPrice = (+productPrices[index] * +orderProduct.quantity).toFixed(2);
          // Creates new order item for each product ordered
          const [orderItem] = await trx.insert(order_items).values({order_id: newOrder.id, product_id: orderProduct.product_id, quantity: orderProduct.quantity, total: +totalPrice}).returning();
          return orderItem;
        })
      );

      // Update the total price of the order
      const total = orderItems.reduce((acc: number, orderItem: OrderItem) => acc + orderItem.total, 0);
      // Updates the order with the total price
      const [updatedOrder] = await trx.update(orders).set({ total: total.toFixed(2) }).where(eq(orders.id, newOrder.id)).returning();
      return { ...updatedOrder, products: orderItems };
    });
    // Sends order information back to the client
    res.json(order);
  } catch (err) {
    handleQueryError(err, res);
  }
});

export default router;