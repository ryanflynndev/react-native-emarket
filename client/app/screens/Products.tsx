import { Text, FlatList, StyleSheet, TouchableOpacity, ListRenderItem, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import { Product } from '../api/types';
import { ProductsPageProps } from '../navigation/types';

const Products = ({ navigation }: ProductsPageProps) => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    load();
  }, []);

  const renderProductItem: ListRenderItem<Product> = ({ item }) => {
    return (
      <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetails', { id: item.id })}>
        <Image style={styles.productImage} source={{ uri: item.product_image }} />
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productPrice}>{`$${item.product_price}`}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEE6',
  },
  productItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    color: '#337357',
    marginTop: 10,
  },
});


export default Products;