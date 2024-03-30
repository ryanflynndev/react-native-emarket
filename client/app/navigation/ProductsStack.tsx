import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";
import { ProductsStackParamList, StackNavigation } from "./types";
import ProductDetails from "../screens/ProductDetails";
import CartModal from "../screens/CartModal";
import { useNavigation } from "@react-navigation/native";
import useCartStore from "../state/cartStore";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';


const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();

const ProductsStackNav = () => {
  return (
  <ProductsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#F5EEE6',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#333A73',
      headerRight: cartButton,
    }}
  >
    <ProductsStack.Screen name="Products" component={Products} options={{ headerTitle: 'Ecomm' }} />
    <ProductsStack.Screen name="ProductDetails" component={ProductDetails} options={{ headerTitle: '' }} />
    <ProductsStack.Screen name="CartModal" component={CartModal} options={{ headerShown: false, presentation: 'modal' }} />
  </ProductsStack.Navigator>
  );
};

const cartButton = () => {
  const navigation = useNavigation<StackNavigation>();
  const { products } = useCartStore((state) => ({
    products: state.products,
  }));

  const [count, setCount] = useState(0);

  useEffect(() => {
    const productCount = products.reduce((prev, product) => prev += +product.quantity, 0);
    setCount(productCount);
  }, [products]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('CartModal')}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {count}
        </Text>
      </View>
      <Ionicons name='cart' size={24} color={'#333A73'}></Ionicons>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: -5,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333A73'
  },
});

export default ProductsStackNav;