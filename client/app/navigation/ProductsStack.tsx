import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";

type ProductsStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
};

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
  </ProductsStack.Navigator>
  );
}

export default ProductsStackNav;