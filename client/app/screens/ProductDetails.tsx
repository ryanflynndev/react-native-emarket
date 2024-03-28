import { Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProductDetailsPageProps } from '../navigation/types/types';
import { Product } from '../api/types/interfaces';
import { getProduct } from '../api/api';

const ProductDetails = ({ route }: ProductDetailsPageProps) => {
  const { id: productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);

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
    margin: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
  },
  productCategory: {
    fontSize: 16,
    margin: 20,
    color: '#666'
  },
  productDescription: {
    fontSize: 16,
    margin: 20,
  },
  loading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 270,
  }
})

export default ProductDetails;