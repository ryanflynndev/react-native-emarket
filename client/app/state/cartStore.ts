import { create } from 'zustand';
import { CartState } from './types';
import { Product } from '../api/types';

// Zustand store for the cart state

const useCartStore = create<CartState>((set) => ({
  products: [],
  total: 0,
  addProduct: (product: Product) => 
    set((state) => {
      // Checks to see if we have that product in the cart
      const hasProduct = state.products.find((p) => p.id === product.id);
      state.total += +product.product_price;
      if (hasProduct) {
        return {
          // Iterates over all the items in the cart, finds the item that matches the product id and increments the quantity
          products: state.products.map((p) => {
            if (p.id === product.id) {
              return { ...p, quantity: p.quantity + 1 };
            }
            return p;
          }),
        };
      } else {
        return {
          products: [...state.products, { ...product, quantity: 1 }],
        }
      }
  }),
  reduceProduct: (product: Product) => 
  set((state) => {
    state.total -= +product.product_price;
    return {
      // Finds the product we want to reduce and decrements the quantity
      products: state.products.map((p) => {
        if (p.id === product.id) {
          console.log('Getting in here');
          console.log(p.quantity);
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      // Filters out any products with a quantity of 0
      }).filter((p) => p.quantity > 0),
    }
  }),
  clearCart: () => {
    set((state) => {
      state.total = 0;
      return { products: [] };
    });
  }
}));

export default useCartStore;