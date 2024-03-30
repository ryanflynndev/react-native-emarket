import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import useCartStore from '../state/cartStore';
import { Order } from '../api/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

const CartModal = () => {
  const [email, setEmail] = useState<string>('');
  const [order, setOrder] = useState<Order | null>(null);
  const navigation = useNavigation<StackNavigation>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { products, total, addProduct, reduceProduct, clearCart } = useCartStore((state) => ({
    products: state.products,
    total: state.total,
    addProduct: state.addProduct,
    reduceProduct: state.reduceProduct,
    clearCart: state.clearCart,
}));

  return (
    <View style={styles.container}>
      {!order && (
        <>
          <Text style={styles.cartTitle}>Your Cart</Text>
          { products.length === 0 && <Text style={styles.emptyCart}>Your cart is empty</Text> }
          <FlatList
            data={products}
            keyExtractor={(product) => product.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>
                  {item.product_name}
                </Text>
              </View>
            )}
          >

          </FlatList>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333A73',
  },
  emptyCart: {
    fontSize: 32,
    textAlign: 'center',
    color: '#333A73',
    fontWeight: 'bold',
  }
});

export default CartModal;