import { Text, StyleSheet, SafeAreaView, Image, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProductDetailsPageProps } from '../navigation/types';
import { Product } from '../api/types';
import { getProduct } from '../api/api';
import useCartStore from '../state/cartStore';
import { Ionicons } from '@expo/vector-icons';

const ProductDetails = ({ route }: ProductDetailsPageProps) => {
  const { id: productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [count, setCount] = useState(0);
  const { products, addProduct, reduceProduct } = useCartStore((state) => ({
      products: state.products,
      addProduct: state.addProduct,
      reduceProduct: state.reduceProduct,
  }));

  useEffect(() => {
    console.log('Updated products');
    updateProductQuantity();
  }, [products]);

  useEffect(() => {
    const load = async () => {
      try {
        const productData = await getProduct(productId);
        console.log("product", productData);
        setProduct(productData);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const updateProductQuantity = () => {
    const result = products.filter(p => p.id === productId);
    console.log('Result', result);
    if (result.length > 0) {
      setCount(result[0].quantity);
    } else {
      setCount(0);
    }
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.productImage} source={{ uri: product.product_image }} />
        <Text style={styles.productName}>{product.product_name}</Text>
        <Text style={styles.productCategory}>{product.product_category}</Text>
        <Text style={styles.productPrice}>{`$${product.product_price}`}</Text>
        <Text style={styles.productDescription}>{product.product_description}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => addProduct(product)}>
            <Ionicons name="add" size={24}></Ionicons>
          </TouchableOpacity>
            <Text style={styles.quantity}>{count}</Text>
          <TouchableOpacity style={styles.button} onPress={() => reduceProduct(product)}>
            <Ionicons name="remove" size={24}></Ionicons>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEE6',
  },
  productImage: {
    margin: 50,
    width: 300,
    height: 300,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    marginHorizontal: 20,
  },
  productCategory: {
    fontSize: 16,
    margin: 10,
    marginHorizontal: 20,
    color: '#666'
  },
  productDescription: {
    fontSize: 16,
    margin: 10,
    marginHorizontal: 20,
  },
  loading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 270,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5EEE6',
    alignItems: 'center',
    flex: 1,
    borderColor: '#333A73',
    borderWidth: 2,
  },
  quantity: {
    fontSize: 16,
    width: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default ProductDetails;