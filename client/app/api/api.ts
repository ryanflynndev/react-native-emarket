import BackendClient from "./BackendClient";
import { CreateOrder, Order, Product } from "./types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const backendClient = new BackendClient(API_URL);

export const getProducts = async (): Promise<Array<Product>> => {
    return await backendClient.getProducts();
};

export const getProduct = async (productId: number): Promise<Product | null> => {
    return await backendClient.getProduct(productId);
};

export const createOrder = async (order: CreateOrder): Promise<Order | null> => {
    return await backendClient.createOrder(order);
}