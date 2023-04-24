import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailsScreen from './components/DetailsScreen';
import HomeScreen from './components/HomeScreen';
import BarcodeScanner from './components/BarcodeScanner';
import EditScreen from "./components/EditScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Add New Item') {
              iconName = focused ? 'add-circle-outline' : 'add-circle-outline';
            } else if (route.name === 'Scan Barcode') {
              iconName = focused ? 'barcode' : 'barcode-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Add New Item" component={DetailsScreen} />
        <Tab.Screen name="Scan Barcode" component={BarcodeScanner} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
