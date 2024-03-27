import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async() => {
      const data = await getProducts();
      console.log("products", data);
      setProducts(data);
    };
    load();
  }, []);

  return (
    <View>
      <Text>Products</Text>
    </View>
  )
}

export default Products;