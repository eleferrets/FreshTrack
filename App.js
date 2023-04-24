import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './components/DetailsScreen'
import HomeScreen from './components/HomeScreen';
import BarcodeScanner from './components/BarcodeScanner';
import EditScreen from "./components/EditScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Edit" component={EditScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="Add New Item" component={DetailsScreen} />
        <Tab.Screen name="Scan Barcode" component={BarcodeScanner} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
