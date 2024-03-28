import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ProductsStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
};

export type ProductsPageProps = NativeStackScreenProps<ProductsStackParamList, 'Products'>;

export type ProductDetailsPageProps = NativeStackScreenProps<ProductsStackParamList, 'ProductDetails'>;