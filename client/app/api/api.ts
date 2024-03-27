import BackendClient from "./BackendClient";
import { Product } from "./types/interfaces";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const backendClient = new BackendClient(API_URL);

export const getProducts = async (): Promise<Array<Product>> => {
    return await backendClient.getProducts();
};
