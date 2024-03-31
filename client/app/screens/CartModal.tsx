import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import React, { useState } from 'react';
import useCartStore from '../state/cartStore';
import { Order } from '../api/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { createOrder } from '../api/api';

const CartModal = () => {
  const [email, setEmail] = useState<string>('');
  const [order, setOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigation>();
  const disableButton = email === '' || submitting;
  const { products, total, addProduct, reduceProduct, clearCart } = useCartStore((state) => ({
    products: state.products,
    total: state.total,
    addProduct: state.addProduct,
    reduceProduct: state.reduceProduct,
    clearCart: state.clearCart,
  }));

  const onSubmitOrder = async () => {
    setSubmitting(true);
    Keyboard.dismiss();
    try {
      const response = await createOrder({ customer_email: email, products: products.map((p) => ({
        product_id: p.id,
        quantity: p.quantity,
      }))});
      setOrder(response);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={65}>
      <Text style={styles.cartTitle}>Your Cart</Text>
      { products.length === 0 && <Text style={styles.emptyCart}>Your cart is empty</Text> }
      {!order && (
        <View>
          <FlatList
            data={products}
            keyExtractor={(product) => product.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItemContainer}>
                <Image source={{ uri: item.product_image }} style={styles.cartItemImage} />
                <View style={styles.itemContainer}>
                  <Text style={styles.cartItemName}>{item.product_name}</Text>
                  <Text>{`$${item.product_price}`}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => reduceProduct(item)}>
                    <Ionicons name="remove" size={20}></Ionicons>
                  </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.button} onPress={() => addProduct(item)}>
                    <Ionicons name="add" size={20}></Ionicons>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
          <TextInput style={styles.emailInput} autoCapitalize='none' placeholder='Enter your email' onChangeText={(e) => setEmail(e)}></TextInput>
          <TouchableOpacity style={[styles.submitButton, email === '' ? styles.inactive : null]} disabled={disableButton} onPress={onSubmitOrder}>
            <Text style={styles.submitButtonText}>{submitting ? 'Checking Out Your Order' : 'Checkout'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
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
  },
  cartItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 20,
  },
  itemContainer: {
    flex: 1,
    paddingTop: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333A73',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#333A73',
    padding: 5,
    width: 30,
    textAlign: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#333A73',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#333A73',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  inactive: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default CartModal;