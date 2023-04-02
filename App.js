import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './components/DetailsScreen'
import HomeScreen from './components/HomeScreen';
import BarcodeScanner from './components/BarcodeScanner';
import EditScreen from "./components/EditScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Barcode" component={BarcodeScanner} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
