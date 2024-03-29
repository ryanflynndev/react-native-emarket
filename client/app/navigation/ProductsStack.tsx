import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";
import { ProductsStackParamList } from "./types";
import ProductDetails from "../screens/ProductDetails";


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
    }}
  >
    <ProductsStack.Screen name="Products" component={Products} options={{headerTitle: 'Ecomm'}} />
    <ProductsStack.Screen name="ProductDetails" component={ProductDetails} options={{headerTitle: ''}} />
  </ProductsStack.Navigator>
  );
}

export default ProductsStackNav;