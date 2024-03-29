export interface Product {
  id: number;
  product_name: string;
  product_category: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  product_image: string;
};

export interface CreateOrder {
  customer_email: string;
  products: Array<{product_id: number, quantity: number}>;
};

export interface Order {
  id: number;
  order_date: string;
  customer_email: string;
  order_total: number;
};