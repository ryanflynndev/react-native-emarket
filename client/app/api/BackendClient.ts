// Class to fetch data from the backend

import axios, { Axios } from 'axios';
import { CreateOrder, Order, Product } from './types';

export default class BackendClient {

  private readonly baseApiUrl: string;

  private readonly axios: Axios;

  constructor(baseApiUrl: string) {
    this.baseApiUrl = baseApiUrl;
    this.axios = axios.create({
      baseURL: baseApiUrl,
      timeout: 10000,
    });
  }

  // Gets products from the backend

  async getProducts(): Promise<Array<Product>> {
    try {
      const { data } = await this.axios.get('/products');
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch products', err);
    }
  }

  async getProduct(productId: number): Promise<Product | null> {
    try {
      const { data } = await this.axios.get(`/products/${productId}`);
      return data[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async createOrder(order: CreateOrder): Promise<Order | null> {
    try {
      const { data } = await this.axios.post('/orders', order);
      return data;
    } catch (err) {
      console.error('Error creating order', err);
      return null;
    }
  }
}