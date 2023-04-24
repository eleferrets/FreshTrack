import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './components/DetailsScreen'
import HomeScreen from './components/HomeScreen';
import BarcodeScanner from './components/BarcodeScanner';
import EditScreen from "./components/EditScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-outline'
                : 'home-outline';
            } else if (route.name === 'Add New Item') {
              iconName = focused ? 'add-circle-outline' : 'add-circle-outline';
            }
            else if (route.name === 'Scan Barcode') {
              iconName = focused ? 'scan-circle-outline' : 'scan-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Add New Item" component={DetailsScreen} />
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="Scan Barcode" component={BarcodeScanner} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
